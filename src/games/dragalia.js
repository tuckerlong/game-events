const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://dragalialost.com/en/news/event/");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll("#news-list li").forEach(element => {
		const title = element.querySelector(".title").textContent.trim();
		const link =  "https://dragalialost.com" + element.querySelector("a").getAttribute("href");

		events[title] = link;
	});

	resolve(events);
});