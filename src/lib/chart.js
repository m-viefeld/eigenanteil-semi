import {
	Chart,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	// BubbleController,
	// DoughnutController,
	LineController,
	// PieController,
	// PolarAreaController,
	// RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	// LogarithmicScale,
	// RadialLinearScale,
	// TimeScale,
	// TimeSeriesScale,
	// Decimation,
	// Filler,
	Legend,
	Title,
	Tooltip,
	// SubTitle
} from "chart.js"

Chart.register(
	// ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	// BubbleController,
	// DoughnutController,
	LineController,
	// PieController,
	// PolarAreaController,
	// RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	// LogarithmicScale,
	// RadialLinearScale,
	// TimeScale,
	// TimeSeriesScale,
	// Decimation,
	// Filler,
	Legend,
	Title,
	Tooltip,
	// SubTitle
)

export { Chart }

/**
 * erstelle ein veränderbares Scatter-Diagramm
 * 
 * @param {HTMLElement} canvas der Canvas, auf dem das Diagramm gezeichnet wird
 * @param {any} options ein Objekt mit Optionen für das Diagramm
 * @returns {object} Objekt zur bearbeitung vom Diagramm
 */
export function toScatter ( canvas, options ) {
	const chart = new Chart(canvas, options)

	return {
		add ( set, data ) {
			chart.data.datasets[set].data.push(data)
			chart.update()
		},
		replace ( set, data ) {
			chart.data.datasets[set].data = data
			chart.update()
		}
	}
}

/**
 * erstelle ein veränderbares linien- oder balkendiagram
 * 
 * @param {HTMLElement} canvas der Canvas, auf dem das Diagramm gezeichnet wird
 * @param {any} options ein objekt mit Optionen für das Diagramm
 * @returns {object} Objekt zur bearbeitung vom Diagramm
 */
export function toLine ( canvas, options ) {
	// erstelle Diagramm
	const chart = new Chart(canvas, options)

	return {
		// füge Daten hinzu
		add ( set, x, y ) {
			if (x != undefined) chart.data.labels.push(x)
			chart.data.datasets[set].data.push(y)

			// aktualisiere Diagramm
			chart.update()
		},
		// füge Label hinzu
		label ( x ) {
			chart.data.labels.push(x)
			// aktualisiere Diagramm
			chart.update()
		}
	}
}

/**
 * erstelle Optionen für ein Diagramm nach einem vorgegebenen Standard
 * 
 * @param {string} xLabel Label für die x-Achse
 * @param {string} yLabel Label für die y-Achse
 * @returns {object} Optionen für Diagramme
 */
export function mkOptions ( xLabel, yLabel ) {
	return {
		scales: {
			x: {
				startAtZero: true,
				min: 0,
				title: {
					display: true,
					text: xLabel,
					font: {
						size: 18
					}
				},
				display: true
			},
			y: {
				startAtZero: true,
				min: 0,
				title: {
					display: true,
					text: yLabel,
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
}