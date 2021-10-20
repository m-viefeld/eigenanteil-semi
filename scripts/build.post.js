import { italic } from "kleur/colors"
import cpr from "cpr"
import extractLicenses from "@m4rch/extract-licenses"
import { copyFile, writeFile } from "node:fs/promises"
import { exec as execCallback } from "node:child_process"
import { promisify } from "node:util"
import { join } from "node:path"
import { __rootname, buildPath, info } from "./_utils.js"

const exec = promisify(execCallback)
const copyFolder = promisify(cpr)

async function main () {
	info("copying", italic("LICENSE"), "to", italic("build/LICENSE"))
	await copyFile(join(__rootname, "LICENSE"), join(buildPath, "LICENSE"))

	info("copying", italic("CITATIONS.md"), "to", italic("build/CITATIONS.md"))
	await copyFile(join(__rootname, "CITATIONS.md"), join(buildPath, "CITATIONS.md"))

	info("copying", italic("data"), "to", italic("build/data"))
	await copyFolder(join(__rootname, "data"), join(buildPath, "data"))

	info("extracting", "licenses to", italic("LICENSES.md"))
	await extractLicenses(__rootname)
	info("copying", italic("LICENSES.md"), "to", italic("build/LICENSES.md"))
	await copyFile(join(__rootname, "LICENSES.md"), join(buildPath, "LICENSES.md"))

	const pkg = {
		name: "semi-visualisation",
		version: "0.1.0",
		description: "",
		author: "m4rch",
		license: "Unlicense",
		main: "index.js",
		scripts: {
			start: "node index.js"
		},
		dependencies: {
			papaparse: "5.3.1"
		},
		type: "module",
		private: true
	}
	info("writing", italic("build/package.json"))
	await writeFile(join(buildPath, "package.json"), JSON.stringify(pkg, null, "\t") + "\n")

	info("installing", "dependencies in", italic("build/"))
	await exec("npm install", { cwd: buildPath })
}

main()
