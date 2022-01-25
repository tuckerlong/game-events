const fs = require("fs");

async function run() {
	const data = {
		"last_cache": (new Date()).toISOString(),
		"Dragalia": await require("./games/dragalia"),
		"KoL": await require("./games/kol"),
		"Lost Ark": await require("./games/lostArk"),
		"Mabinogi": await require("./games/mabinogi"),
		"Maplestory": await require("./games/maplestory"),
		"OSRS": await require("./games/osrs"),
		"Path of Exile": await require("./games/poe"),
		"Tarkov": await require("./games/tarkov"),
		"Vindictus": await require("./games/vindictus"),
	}

	console.log(data);

	await fs.promises.writeFile("src/data.json", JSON.stringify(data));
}

run();