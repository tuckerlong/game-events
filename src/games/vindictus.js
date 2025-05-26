const steam = require("../steam");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let json = null;
	
	try {
		json = await steam(212160, 5);
	} catch(e) {
		console.error(e);
	}

	if (json === null) return resolve({});

	json.appnews.newsitems.forEach(item => {
		events[item.title] = item.url;
	});

	resolve(events);
});