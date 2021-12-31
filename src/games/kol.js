const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://www.kingdomofloathing.com/");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll("table").forEach(element => {
		if (element.querySelector("table") !== null) return;
		if (!element.textContent.includes("There are currently")) return;

		element.querySelectorAll("p").forEach((para, idx) => {
			if (idx === 0) return;

			const dateElement = para.querySelector("b");

			if (dateElement === null) return;

			const title = dateElement.textContent;

			events[title] = "https://www.kingdomofloathing.com/"
		});
	});

	resolve(events);
});