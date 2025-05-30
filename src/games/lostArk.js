const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://www.playlostark.com/en-us/news");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll(".ags-SlotModule").forEach(element => {
		if (Object.keys(events).length >= 5) {
			return;
		}

		const title = element.querySelector(".ags-SlotModule-contentContainer-heading").textContent.trim();
		const link = "https://www.playlostark.com" + element.querySelector("a").getAttribute("href");

		events[title] = link;
	});

	resolve(events);
});