<!-- korrespondiert zu /students -->
<script context="module">
	export async function load ({ fetch }) {
		// lese Daten der Schüler
		const req = await fetch("/students.json")
		// convertiere zu Objekt
		const students = await req.json()

		return {
			status: 200,
			props: {
				// gebe schüler als Variable durch an Komponenten
				// gebe nur nötige Daten durch für Effizienz
				students: students.map(({ G2, G3 }) => ({ G2, G3 }))
			}
		}
	}
</script>

<script>
	// css
	import "$lib/main.css"
	import "$lib/misc.css"
	// Tools
	import * as tf from "@tensorflow/tfjs"
	import { toLine, mkOptions } from "$lib/chart.js"
	import { normalize, denormalize, shuffle } from "$lib/utils.js"
	import { onMount } from "svelte"
	// Komponenten
	import Navigate from "$lib/navigate.svelte"
	import Source from "$lib/source.svelte"

	// bekomme Daten der Schüler aus load function
	export let students

	let chartLoss
	let chartVal
	onMount(() => {
		const loss = document.querySelector("canvas#loss")
		const val = document.querySelector("canvas#validate")

		chartLoss = toLine(loss, {
			type: "line",
			data: {
				labels: [],
				datasets: [
					{
						label: "Verlust",
						borderColor: "lightblue",
						backgroundColor: "lightblue",
						data: []
					}
				]
			},
			options: mkOptions("Epoche", "Verlust")
		})

		chartVal = toLine(val, {
			type: "bar",
			data: {
				datasets: [
					{
						label: "tatsächlich",
						borderColor: "orange",
						backgroundColor: "orange",
						data: []
					},
					{
						label: "vorhergesagt",
						borderColor: "green",
						backgroundColor: "green",
						data: []
					}
				]
			},
			options: mkOptions("#", "G3")
		})
	})

	function split ( array, testSize ) {
		const splitIdx = ( 1 - testSize ) * array.length

		const train = array.slice(0, splitIdx)
		const test = array.slice(splitIdx)

		return [
			tf.tensor(train, [ train.length ]),
			tf.tensor(test, [ test.length ])
		]
	}

	let trained = false
	async function train () {
		if (trained) return
		trained = true

		const shuffled = shuffle(students)

		const x = shuffled.map(({ G2 }) => G2).map(( p ) => normalize(p, 20))
		const y = shuffled.map(({ G3 }) => G3).map(( p ) => normalize(p, 20))

		const [ xTrain, xTest ] = split(x, .05)
		const [ yTrain, yTest ] = split(y, .05)

		const model = tf.sequential()

		model.add(tf.layers.dense({ inputShape: [ 1 ], units: 4 }))
		model.add(tf.layers.dense({ units: 1 }))

		model.compile({ optimizer: "sgd", loss: "meanSquaredError" })

		for (let i = 0; i < 500; i++) {
			const { history } = await model.fit(xTrain, yTrain, {
				shuffle: true,
				epochs: 1
			})

			const loss = history.loss.reduce(( acc, curr ) => acc + curr, 0) / history.loss.length
			chartLoss.add(0, i, loss * 5)
		}

		const predict = model.predict(xTest)

		const predicted = await predict.array()
		const actual = await yTest.array()

		for (let i = 0; i < predicted.length; i++) {
			chartVal.label(i + 1)

			chartVal.add(0, null, denormalize(actual[i], 20))
			chartVal.add(1, null, denormalize(predicted[i], 20))
		}
	}
</script>

<svelte:head>
	<!-- Titel der Webseite -->
	<title>Demonstration an tatsächlichen Daten</title>
</svelte:head>

<!-- Infobox #1 -->
<div class="explain">
	<h2>Infobox #1</h2>

	<p>Hier arbeiten wir das Erste mal mit richtigen Daten.</p>
	<p>Für dieses Beispiel werden die zweiten und dritten Abschlussnoten einiger anonymer Schüler betrachtet.</p>
	<p>Der Datensatz ist von einer Portugiesischen Schule, die betrachteten Noten sind aus dem Mathe-Kurs.</p>
	<p>In diesem Beispiel lernt der Algorithmus also an den Daten, die Sie auf der ersten Seite bereits gesehen haben.</p>
	<p>Um das Training zu starten müssen Sie einfach nur auf den "trainieren" Knopf drücken, den Rest macht das Programm alleine</p>
</div>

<!-- Box für Aktion -->
<div class="container">
	<h2>Trainieren Sie den Algorithmus</h2>
	<div>hier drücken, um das Training zu starten</div>
	<button on:click={train}>trainieren</button>
</div>

<!-- Diagramme -->
<div class="chart-container">	
	<canvas id="loss" />
	<canvas id="validate" />
</div>

<!-- Quelle -->
<Source>
	<h4>students</h4>
	<p>
		P. Cortez and A. Silva. Using Data Mining to Predict Secondary School Student Performance. In A. Brito and J. Teixeira Eds.,
		Proceedings of 5th FUture BUsiness TEChnology Conference (FUBUTEC 2008) pp. 5-12, Porto, Portugal, April, 2008, EUROSIS, ISBN 978-9077381-39-7.
	</p>
	<a href="http://www3.dsi.uminho.pt/pcortez/student.pdf">Web Link</a>
</Source>

<!-- Letzte Seite -->
<Navigate prev={{ path: "simple", name: "Simpel" }} />

<style>
	/* Platz zwischen den Diagrammen */
	#loss {
		margin-bottom: 20px;
	}
</style>
