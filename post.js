const { request } = require("node:https");

module.exports = {
    post: (status, url) => {
        const req = request(platforms.mastodon(url), { method: 'POST', headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' } }, (res) => {
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk.toString()}`);
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