const fs = require("fs");

async function run() {
	const data = {
		"id": Math.random().toString(),
		"Mabinogi": await require("./games/mabinogi"),
		"Maplestory": await require("./games/maplestory")
	}

	console.log(data);

	await fs.promises.writeFile("src/data.json", JSON.stringify(data));
}

run();