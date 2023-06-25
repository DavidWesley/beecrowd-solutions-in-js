const { createReadStream } = require("node:fs")
const { createInterface } = require("node:readline")

//// READING FILE | STREAMS ////

class LineReader {
	/**
	 * @param {import("node:fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @return {import("node:readline").ReadLine}
	 */
	static createReadLineInterface(path, encoding = "utf8") {
		// For execution security reasons, do not change this object
		const readStreamOptions = {
			encoding: encoding,
			flags: "r",
			emitClose: true,
			autoClose: true // critical
		}

		return createInterface({
			input: createReadStream(path, readStreamOptions),
			crlfDelay: Infinity,
			terminal: false
		})
	}

	/**
	 * @param {import("node:fs").PathLike} path
	 * @param {BufferEncoding} encoding
	 * @param {boolean} split To split spaces into line
	 */
	static create(path, encoding, split = false) {
		let EOF = false
		let RLI = LineReader.createReadLineInterface(path, encoding)

		const nextLine = async (fn) => {
			if (EOF) return undefined

			let { value } = await RLI[Symbol.asyncIterator]().next()

			if (split) {
				value = value.split(/\s+/)
			}

			return (typeof fn === "function") ? fn(value) : value
		}

		RLI.once("close", () => { EOF = true })

		return {
			hasNextLine: () => !EOF,
			nextLine: nextLine,
			close: () => RLI.close()
		}
	}
}

function simplePolynomialDerivation(equation = "") {
	return equation
		.replace(/\b(\d+)\b/g, "$1x0")
		.replace(/(\d*)([a-zA-Z])(\d*)/g, (_, cof, variable, exp) => {
			if (cof === "") cof = "1"
			if (exp === "") exp = "1"

			const derivedCoefficient = Number.parseInt(cof, 10) * Number.parseInt(exp, 10)
			const derivedExponent = Number.parseInt(exp, 10) - 1

			switch (exp) {
			case "0": case "1":
				return String.prototype.concat(derivedCoefficient)
			case "2":
				return String.prototype.concat(derivedCoefficient, variable)
			default:
				return String.prototype.concat(derivedCoefficient, variable, derivedExponent)
			}
		})
}

async function main() {
	const PATH = "/dev/stdin"
	/** @type {BufferEncoding} */
	const ENCODING = "utf8"

	const output = []
	const lineReader = LineReader.create(PATH, ENCODING, true)

	while (lineReader.hasNextLine()) {
		const T = Number.parseInt(await lineReader.nextLine(), 10)
		const polynomialEquation = await lineReader.nextLine()

		if (Number.isNaN(T)) break // EOF
		output.push(simplePolynomialDerivation(polynomialEquation))
	}

	if (lineReader.hasNextLine())
		lineReader.close()

	console.log(output.join("\n"))
}

main()