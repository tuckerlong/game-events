const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://oldschool.runescape.com/");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll("article.news-article").forEach(element => {
		const title = element.querySelector(".news-article__title").textContent.trim();
		const link = element.querySelector(".news-article__title .secondary-link").getAttribute("href");

		events[title] = link;
	});

	resolve(events);
});