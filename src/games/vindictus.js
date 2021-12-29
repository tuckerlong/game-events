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
		let url = item.contents.substring(item.contents.indexOf("[url=") + 5, item.contents.length - 6);
		url = url.substring(0,  url.lastIndexOf(']'));

		events[item.title] = url;
	});

	resolve(events);
});