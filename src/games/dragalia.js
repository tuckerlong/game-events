const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://gamepress.gg/dragalialost/news");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll(".feed-item-container").forEach(element => {
		if (element.querySelector(".game-home-feed-title").textContent.trim().toLowerCase() === 'announcements') {
			return;
		}

		const title = element.querySelector(".feed-item-title").textContent.trim();
		const link =  "https://gamepress.gg" + element.querySelector("a").getAttribute("href");

		if (Object.keys(events).length < 5) {
			events[title] = link;
		}
	});

	resolve(events);
});