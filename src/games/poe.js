const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://www.pathofexile.com/forum/view-forum/news");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll(".thread").forEach(element => {
		if (Object.keys(events).length >= 5) return;

		const title = element.querySelector(".title").textContent.trim();
		const link = "https://www.pathofexile.com" + element.querySelector(".title a").getAttribute("href");

		events[title] = link;
	});

	resolve(events);
});