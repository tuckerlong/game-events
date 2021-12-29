const https = require("https");
const jsdom = require("jsdom");


module.exports = async (path) => await new Promise((resolve, reject) => {
	https.get(path, (res) => {
		const body = [];

		res.on('data', function(chunk) {
			body.push(chunk);
		});

		res.on('end', function() {
			try {
				return resolve(new jsdom.JSDOM(Buffer.concat(body).toString()));
			} catch(e) {
				reject(e);
			}
			resolve(null);
		});
	});
});