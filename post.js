const { request } = require("node:https");
const { env } = require("node:process");

module.exports = {
    post: async (status, url) => {
        return new Promise((resolve, reject) => {
            const req = request(platforms.mastodon(url), { method: 'POST', headers: { 'Authorization': `Bearer ${env.MASTODON_TOKEN}`, 'Content-Type': 'application/json' } }, (res) => {
                let response = '';
                res.on('data', (data) => response += data.toString());
                res.on('end', () => resolve(response));
                res.on('error', (error) => reject(error));
            });
            req.write(JSON.stringify({ status }));
            req.end();
        })
    }
}

const platforms = {
    mastodon: (url) => `${url}/api/v1/statuses`
}