const util = require("../util");

module.exports = new Promise(async (resolve, reject) => {
	const events = {};
	let dom = null;
	
	try {
		dom = await util("https://wiki.mabinogiworld.com/view/Wiki_Home");
	} catch(e) {
		console.error(e);
	}

	if (dom === null) return resolve({});

	dom.window.document.body.querySelectorAll("table").forEach(element => {
		let valid = false;
		element.querySelectorAll("td").forEach(td => {
			if (td.textContent.trim().includes('Current Events')) {
				valid = true;
			}
		});

		if (valid) {
			element.querySelectorAll("td > a").forEach(e => {
				events[e.textContent.trim()] = "https://wiki.mabinogiworld.com/" + e.getAttribute("href");
			})
		}
	});

	resolve(events);
});