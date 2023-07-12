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
		const message = read_commit.match(matcher);
		if (message !== null) {
			post(message[0].trim(), mastodon_url);
			core.setOutput('message', message[0].trim());
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}


module.exports = {
	run
};
