const { readFileSync } = require("node:fs")
const [[N, M], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 101)
	.map((line) => line.split(" ", 100).map(value => Number.parseInt(value, 10)))

function main() {
	let counter = 0
	for (let index = 0; index < N; index++) {
		if (input[index].slice(0, M + 1).every(points => points > 0))
			counter += 1

	}

	console.log(counter)
}


main()