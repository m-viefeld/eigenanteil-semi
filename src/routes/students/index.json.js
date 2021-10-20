/* -- diese datei korrespondiert zu /students.json -- */

// für das Auslesen von csv Daten
import pp from "papaparse"
// für das Lesen der Datei
import { promises as fs } from "fs"
import { join } from "path"

export async function get () {
	// lese datei für die Mathematik Ergebnisse der Schüler
	const csv = await fs.readFile(join("data", "students", "student-mat.csv"), "utf8")
	// verwandle csv Daten zu einem Objekt
	const { data } = pp.parse(csv.toString(), {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true
	})

	return {
		status: 200,
		// zeige nur wichtige Daten für Effizienz
		body: data.map(({ age, freetime, G2, G3 }) => ({ age, freetime, G2, G3 }))
	}
}
