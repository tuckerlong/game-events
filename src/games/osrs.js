const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://secure.runescape.com/m=news/archive?oldschool=1");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll(".news-article__details").forEach(element => {
		const title = element.querySelector(".news-list-article__title-link").textContent.trim();
		const link = element.querySelector(".news-list-article__title-link").getAttribute("href");

		events[title] = link;
	});

	resolve(events);
});