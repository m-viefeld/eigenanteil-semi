<!-- korrespondiert zu /simple -->
<script context="module">
	export function load () {
		// initialisiere Werte-arrays
		const x = []
		const y = []

		// zwischen 5 und 10 Punkte
		const iterations = Math.floor(Math.random() * 10) + 5
		for (let i = 0; i < iterations; i++) {
			// generiere zufällige Zahl und füge zu array hinzu
			const num = Math.floor(Math.random() * 5) + 0
			x.push(num)
			y.push(num)
		}

		return {
			status: 200,
			props: {
				// gebe x und y als Variable durch an Komponenten
				x,
				y
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
	import { onMount } from "svelte"
	// Komponenten
	import Expand from "$lib/expand.svelte"
	import Navigate from "$lib/navigate.svelte"

	// empfange erstellte Werte von der load funktion
	export let x
	export let y

	// const model = tf.sequential()
	// initialisiere Variable
	let model
	onMount(() => {
		// initialisiere Modell
		model = tf.sequential()

		// füge eingang und ausgang hinzu
		model.add(tf.layers.dense({ inputShape: [ 1 ], units: 4 }))
		model.add(tf.layers.dense({ units: 1 }))

		// initialisiere mit meanSquaredError
		model.compile({ optimizer: "sgd", loss: "meanSquaredError" })
	})

	// Zahl, die eingegeben wird
	let toPredict = ""
	async function predict () {
		if (!toPredict || isNaN(+toPredict)) return document.querySelector("#prediction").innerHTML = "keine valide Nummer"

		const prediction = model.predict(tf.tensor([ +toPredict ], [ 1 ]))
		const num =	await prediction.array()

		document.querySelector("#prediction").innerHTML = `Vorhersage: ${num[0]}`
	}

	// wenn schon trainiert wurde ...
	let trained = false
	async function train () {
		// ... stoppe die funktion
		if (trained) return
		trained = true

		// zeige Komponente mit Diagramm und 2. Infobox an
		const charts = document.querySelector("#charts")
		charts.style = "display: block"

		// initialisere Diagramme
		const ctx = document.querySelector("canvas#loss")
		const chart = toLine(ctx, {
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

		// erstelle Vektoren
		const xs = tf.tensor(x, [ x.length ])
		const ys = tf.tensor(y, [ y.length ])

		// trainiere 500 mal
		for (let i = 0; i < 500; i++) {
			const { history } = await model.fit(xs, ys, {
				shuffle: true,
				epochs: 1
			})

			// füge Abweichung zu Diagramm hinzu
			const loss = history.loss.reduce(( acc, curr ) => acc + curr, 0) / history.loss.length
			chart.add(0, i, loss)
		}
	}
</script>


<svelte:head>
	<!-- Webseite Titel -->
	<title>Simple Demonstration zu maschinellem Lernen</title>
</svelte:head>

<!-- Überschrift -->
<h1>simple</h1>

<!-- Infobox #1 -->
<div class="explain">
	<h2>Infobox #1</h2>

	<p>Bevor wir mit richtigen Daten lernen, ist hier noch eine simple Veranschaulichung der linearen Regression</p>
	<p>In diesem sehr simplen Beispiel erstellt das Programm eigene Daten, um den Lernprozess zu veranschaulichen.</p>
	<p>Der Algorithmus wird mit einem Set an Punkten trainiert,
		bei dem von jedem Punkt der <code class="it">x</code> Wert identisch zum jewiligen <code class="it">y</code> Wert ist</p>
	<p>Das bedeutet, wenn <code>x = 1</code>, dann <code>y = 1</code> und wenn <code>x = 2</code>, dann <code>y = 2</code></p>

	<!-- Punkte Anschauen -->
	<Expand preview="Klicken Sie hier, um die Punkte zu sehen">
		{#each x as _, i}
			<code class="sm">
				P{i + 1}({x[i]}, {y[i]});
			</code>
		{/each}
	</Expand>

	<div class="br" />

	<p>Wenn Sie eine Nummer bei Vorhersagen eingeben und den Knopf drücken, sollten Sie sehen, dass der Algorithmus eine zufällige Zahl rät.</p>
	<p>Wenn Sie Glück haben, ist diese vorhergesagte Zahl sehr ähnlich zum korrekten Wert (ihrer Eingabe).</p>
	<p>Wenn Sie die Seite neu laden und die gleiche Zahl vorhersagen lassen sollten, Sie sehen, dass der Algorithmus eine andere Zahl rät.</p>
	<p>Das ist, weil Sie den Algorithmus noch nicht trainiert haben</p>

	<div class="br" />

	<p>Um den Algorithmus zu trainieren müssen Sie den anderen Knopf mit dem text "trainieren" drücken</p>
</div>

<div class="block">
	<div class="container first">
		<h2>Lassen Sie den Algorithmus einen Punkt vorhersagen versuchen</h2>
		<input placeholder="eine nummer" bind:value={toPredict} type="number" />
		<div id="prediction">noch keine Vorhersage</div>
		<button on:click={predict}>vorhersagen</button>
	</div>
	
	<div class="container second">	
		<h2>Trainieren Sie den Algorithmus</h2>
		<div>hier drücken, um das Training zu starten</div>
		<button on:click={train}>trainieren</button>
	</div>
</div>

<!-- Diagramm und Infobox #2 -->
<div id="charts">
	<div class="chart-container">
		<canvas id="loss" />
	</div>

	<div class="explain">
		<h2>Infobox #2</h2>

		<p>Über dieser Erklärung sollten Sie ein Diagramm mit einer Linie sehen, die irgendwo zwischen 1 und 20 startet und sich dann sehr rapide 0 annähert</p>
		<p>Diese Linie zeigt auf der y-Achse die durchschnittliche Abweichung der tatsächlichen Werte von den vorhergesagten Werten des Algorithmus.</p>
		<p>Auf der x-Achse ist die momentane Epoche, also die Anzahl, wie oft der Algorithmus bereits trainiert hat.</p>
		<p>Der Algorithmus trainiert insgesamt 500 mal für bessere Genauigkeit, jedoch sollten bei der Einfachheit der Werte auch weniger genügen.</p>

		<div class="br" />

		<p>Wenn der Algorithmus fertig trainiert hat, das heißt die blaue Linie sich nicht mehr bewegt, dann sollten Sie sehen,
			dass wenn Sie nochmal versuchen sich einen Wert vorherzusagen, das Ergebnis schon deutlich näher am korrekten Wert sein sollte</p>
	</div>
</div>

<!-- Links zu nächsten Seiten -->
<Navigate prev={{ path: "data", name: "Daten" }}  next={{ path: "students", name: "Schüler" }}  />

<style>
	#charts {
		display: none;
		margin-bottom: 40px;
	}

	.block {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 10px;
	}

	.container.first {
		width: 50%;
	}

	#prediction {
		display: inline-block;
		font-size: 16;
	}
</style>
