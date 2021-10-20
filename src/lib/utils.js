/* --- eine Sammlung aller möglichen nützlichen Funktionen --- */

/**
 * einen Punkt auf einen Wert von maximal 5 herunterzuskaliern mithilfe vom Maximalwert des Datensatzes
 *
 * @param {number} point die zu verkleinernde koordinate
 * @param {number} max das maximum des datensets
 */ 
export function normalize ( point, max ) {
	const factor = 1 / max * 5
	return point * factor
}

/**
 * einen klein skalierten Punkt wieder auf die Originalgröße bringen
 * 
 * @param {number} point die zu vergrößernde Koordinate
 * @param {number} max das Maximum des Datensets
 */
export function denormalize ( point, max ) {
	const factor = 1 * max / 5
	return point * factor
}

/**
 * eine Implementation des Fisher-Yates Mischalgorithmus
 * 
 * @param {any[]} array array, was gemischt werden soll
 */
export function shuffle ( array ) {
	// kopieren des originals
	const copy = [ ...array ]

	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * ( i + 1 ))

		const help = copy[i]
		copy[i] = copy[j]
		copy[j] = help
	}

	return copy
}
