const { readFileSync } = require("node:fs")
const [[N], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1 + 10)
	.map((line) => line.split(" ", 2))

function main() {
	const RingSocietySpeciesReport = {
		Hobbit: 0,
		Human: 0,
		Elf: 0,
		Dwarf: 0,
		Mage: 0
	}

	for (let index = 0; index < Number.parseInt(N, 10); index++) {
		switch (input[index].at(1)) {
		case "A": RingSocietySpeciesReport.Dwarf++; break
		case "E": RingSocietySpeciesReport.Elf++; break
		case "H": RingSocietySpeciesReport.Human++; break
		case "M": RingSocietySpeciesReport.Mage++; break
		case "X": RingSocietySpeciesReport.Hobbit++; break
		}
	}

	console.log(`${RingSocietySpeciesReport.Hobbit} Hobbit(s)`)
	console.log(`${RingSocietySpeciesReport.Human} Humano(s)`)
	console.log(`${RingSocietySpeciesReport.Elf} Elfo(s)`)
	console.log(`${RingSocietySpeciesReport.Dwarf} Anao(oes)`)
	console.log(`${RingSocietySpeciesReport.Mage} Mago(s)`)
}

main()
