const { request } = require("node:https");
const { env } = require("node:process");

module.exports = {
    post: (status, url) => {
        const req = request(platforms.mastodon(url), { method: 'POST', headers: { 'Authorization': `Bearer ${env.MASTODON_TOKEN}`, 'Content-Type': 'application/json' } }, (res) => {
            res.on('data', (chunk) => {
                console.log(`BODY:`, JSON.parse(chunk));
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });
        req.write(JSON.stringify({ status }));
        console.log("Sending", req);
        req.end();
    }
}

const platforms = {
    mastodon: (url) => `${url}/api/v1/statuses`
}