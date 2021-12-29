const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://maplestory.nexon.net/news/events#news-filter");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll(".news-item").forEach(element => {
		const title = element.querySelector('.text h3').textContent.trim();
		events[title] = 'https://maplestory.nexon.net/' + element.querySelector('.text h3 a').getAttribute('href');
	});

	resolve(events);
});