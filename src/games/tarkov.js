const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://www.escapefromtarkov.com/news");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll("#news-list li").forEach(element => {
		if (Object.keys(events).length >= 5) return;

		const title = element.querySelector(".headtext a").textContent.trim();
		const link = "https://www.escapefromtarkov.com" + element.querySelector(".headtext a").getAttribute("href");

		events[title] = link;
	});

	resolve(events);
});