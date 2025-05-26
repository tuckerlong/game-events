const Parser = require("rss-parser");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let feed = null;
	
	try {
		feed = await new Parser().parseURL("https://www.pathofexile.com/news/rss");
	} catch(e) {
		console.error(e);
	}

	if (feed === null) return resolve({});

	for (let i = 0; i < Math.min(5, feed.items.length); i++) {
		events[feed.items[i].title] = feed.items[i].link
	}

	resolve(events);
});