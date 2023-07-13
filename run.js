const core = require('@actions/core');
const exec = require('@actions/exec');
const { env } = require('node:process');
const { post } = require('./post');

async function readCommit() {
	let log = '';
	const listeners = {
		stdout: (data) => {
			log += data.toString();
		}
	}
	await exec.exec(
		'git log', ['-1', '--no-merges', '--format="%b"'],
		{ listeners }
	);
	return log;
}

async function run() {
	try {
		const mastodon_url = env.MASTODON_URL;
		const prefix = core.getInput('prefix', { required: true });
		const raw_body = await readCommit();
		const read_commit = raw_body.trimEnd();
		const matcher = new RegExp(`(?<=${prefix}).*`);
		const raw_message = read_commit.match(matcher);
		core.debug(raw_message !== null ? `Found message` : `No message found with "${prefix}"`);
		if (raw_message !== null) {
			const message = raw_message[0].trim();
			core.debug(`Sending "${message}"`);
			const response = await post(message, mastodon_url);
			core.debug(`Success response: ${JSON.parse(response)}`);
			core.notice(`Message posted: "${message}`)
		} else {
			core.notice(`No update posted`);
		}
	} catch (error) {
		core.debug(`error: ${JSON.parse(error)}`)
		core.setFailed(error.message);
	}
}


module.exports = {
	run
};
