const https = require("https");
const jsdom = require("jsdom");


module.exports = async (appid, count) => await new Promise((resolve, reject) => {
	https.get(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appid}&count=${count}`, (res) => {
		const body = [];

		res.on('data', function(chunk) {
			body.push(chunk);
		});

		res.on('end', function() {
			try {
				return resolve(JSON.parse(Buffer.concat(body).toString()));
			} catch(e) {
				reject(e);
			}
			resolve(null);
		});
	});
});