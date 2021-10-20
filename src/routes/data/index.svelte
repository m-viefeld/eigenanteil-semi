<!-- korrespondiert zu /data -->
<script context="module">
	export async function load ({ fetch }) {
		// hole Daten von /students.json
		const req = await fetch("/students.json")
		const students = await req.json()

		return {
			status: 200,
			props: {
				// gebe Daten für Schüler durch
				students
			}
		}
	}
</script>

<script>
	// css
	import "$lib/main.css"
	import "$lib/misc.css"
	// Tools
	import { toScatter, mkOptions } from "$lib/chart.js";
	import { onMount } from "svelte"
	// Komponenten
	import Navigate from "$lib/navigate.svelte"
	import Expand from "$lib/expand.svelte"
	import Source from "$lib/source.svelte"

	// empfange Daten für Schüler
	export let students

	// initialisiere Variablen
	let chart
	let mseContainer
	let points = []
	onMount(() => {
		// wähle den canvas aus, auf dem der graph erstellt wird
		const showcase = document.querySelector("canvas#showcase")

		// generiere zufällige punkte
		points = randomPoints()
		// berechne die mittlere quadratische Abweichung
		const mse = calculateMSE(points, ( x ) => x)
		mseContainer.innerHTML = `MSE: ${mse}`

		// initialisiere diagramm
		chart = toScatter(showcase, {
			type: "scatter",
			data: {
				datasets: [
					{
						label: "Daten",
						data: points,
						backgroundColor: "green",
						borderColor: "green",
						pointRadius: 3,
						pointHoverRadius: 5
					},
					{
						label: "f",
						data: [{ x: 0, y: 0 }, { x: 5, y: 5 }],
						backgroundColor: "#0000ff55",
						borderColor: "#0000ff55",
						showLine: true,
						pointRadius: 0,
						pointHoverRadius: 0
					}
				]
			},
			options: mkOptions("x", "y")
		})

		const correlated = document.querySelector("canvas#students-correlated")
		const uncorrelated = document.querySelector("canvas#students-uncorrelated")

		toScatter(correlated, {
			type: "scatter",
			data: {
				datasets: [
					{
						label: "Schüler",
						data: students.map(({ G2, G3 }) => ({ x: G2, y: G3 })),
						backgroundColor: "#00808022",
						borderColor: "#00808022"
					}
				]
			},
			options: mkOptions("G2", "G3")
		})

		toScatter(uncorrelated, {
			type: "scatter",
			data: {
				datasets: [
					{
						label: "Schüler",
						data: students.map(({ age, freetime }) => ({ x: age, y: freetime })),
						backgroundColor: "#00808022",
						borderColor: "#00808022"
					}
				]
			},
			options: {
				scales: {
					x: {
						min: 14,
						title: {
							display: true,
							text: "Alter [a]",
							font: {
								size: 18
							}
						},
						display: true
					},
					y: {
						title: {
							display: true,
							text: "Freizeit",
							font: {
								size: 18
							}
						},
						display: true
					}
				},
				animation: {
					duration: 100
				}
			}
		})
	})

	// generiere zufällige punkte
	function randomPoints () {
		const nPoints = []
		// generiere 10 punkte
		for (let i = 0; i < 10; i++) {
			const point = {
				x: Math.floor(Math.random() * 6),
				y: Math.floor(Math.random() * 6)
			}

			nPoints.push(point)
		}

		// punkte überschreiben
		points = nPoints
		return nPoints
	}

	// die mittlere quadratische Abweichung berechnen
	function calculateMSE ( points, fn ) {
		let total = 0
		for (const { x, y } of points) {
			total += Math.pow(y - fn(x), 2)
		}

		return total / points.length
	}

	// das diagramm verändern, wenn der knopf 
	function btnRandomize () {
		const points = randomPoints()
		chart.replace(0, points)

		const mse = calculateMSE(points, ( x ) => x)
		mseContainer.innerHTML = `MSE: ${mse}`
	}
</script>


<svelte:head>
	<!-- titel der seite -->
	<title>Visualisierung Daten</title>
</svelte:head>

<!-- überschrift -->
<h1>data</h1>

<!-- inf box #1 -->
<div class="explain">
	<h2>Infobox #1</h2>

	<p>Unterhalb von dieser Erklärung können Sie ein Diagramm mit 10 zufällig generierten Punkten sehen.</p>
	<p>Die linie repräsentiert die Funktion <code><em>f</em>: y = x</code>.</p>

	<Expand preview="Klicken Sie hier, um die Punkte zu sehen">
		{#each points as { x, y }, i}
			<code class="sm">P{i + 1}({x}, {y}); </code>
		{/each}
	</Expand>

	<div class="br" />

	<p>Direkt unterhalb des Diagramms ist eine Textbox mit dem Text <code>MSE: [nummer]</code>.</p>
	<p>Das ist die berechnete mittlere quadratische Abweichung der Funktion <code class="it">f</code>.</p>

	<div class="br" />

	<p>Darunter ist ein Knopf, mit dem Sie neue Punkte generieren können.</p>
</div>

<div class="chart-container">
	<!-- diagramm -->
	<canvas id="showcase" />
	<!-- MSE -->
	<code bind:this={mseContainer} class="mse sm">MSE:</code>
	<!-- knopf -->
	<button class="sm" on:click={btnRandomize}>generate random points</button>
</div>

<!-- Infobox #2 -->
<div class="explain">
	<h2>Infobox #2</h2>
	
	<p>Wenn Sie die Punkte einige Male neu generieren, werden Sie erkennen können, dass der <code>MSE</code> Wert niedriger ist, wenn die Punkte näher an der Linie sind</p>
	<p>Der Einfachheit halber können Sie nur neue Punkte generieren.</p>
	<p>Ein Algorithmus wird diese aber realistischerweise nicht verändern können, da diese gegeben sind</p>
	<p>Instead it will try to generate a new function <code class="it">f</code> to approximate the points better</p>
	<p>Stattdessen wird dieser die Funktion <code class="it">f</code> verändern, um die Punkte besser anzunähern</p>
</div>

<!-- Infobox #3 -->
<div class="explain">
	<h2>Infobox #3</h2>
	
	<p>Unter dieser Infobox können Sie noch 2 Weitere Diagramme sehen.</p>
	<p>Die Daten dieser Diagramme sind aus einem öffentlich zugänglichen Datensatz an anonymiserten Schülern aus Portugal.</p>
</div>

<!-- Diagramme für Schüler -->
<div class="chart-container">
	<!-- korrelierende Daten -->
	<canvas id="students-correlated"></canvas>
	<!-- nicht korrelierende Daten -->
	<canvas id="students-uncorrelated"></canvas>
</div>


<!-- Infobox #4 -->
<div class="explain">
	<h2>Infobox #4</h2>

	<p>Das obere Diagramm zeigt die Korrelation zwischen der zweiten Abschlussnote und der dritten.</p>
	<p>Wie eindeutig zu erkennen ist, korrelieren diese Werte linear.</p>

	<div class="br" />

	<p>Im Gegensatz dazu ist im unteren der beiden Diagramme die Korrelation zwischen der Freizeit [0 = wenig, 5 = viel] pro Tag und dem Alter der Schüler.</p>
	<p>Wie zu erwarten ist keine Korrelation irgendeiner Art erkennbar.</p>

	<div class="br" />

	<p>Daraus lässt sich schließen, dass man mit den Daten des ersten Diagramms gut eine lineare Korrelation implementieren kann.</p>
</div>

<Source>
	<h4>students</h4>
	<p>
		P. Cortez and A. Silva. Using Data Mining to Predict Secondary School Student Performance. In A. Brito and J. Teixeira Eds.,
		Proceedings of 5th FUture BUsiness TEChnology Conference (FUBUTEC 2008) pp. 5-12, Porto, Portugal, April, 2008, EUROSIS, ISBN 978-9077381-39-7.
	</p>
	<a href="http://www3.dsi.uminho.pt/pcortez/student.pdf">Web Link</a>
</Source>

<Navigate next={{ path: "simple", name: "Simpel" }} />
