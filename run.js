const core = require('@actions/core');
const exec = require('@actions/exec');

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
  		const prefix = core.getInput('prefix', { required: true });
		const raw_body = await readCommit();
		const read_commit = raw_body.trimEnd();
		const matcher = new RegExp(`(?<=${prefix}).*`);
		const post = read_commit.match(matcher);
		if(post !== null) {
			core.setOutput('post', post[0].trimStart());
		}
	} catch (error) {
  		core.setFailed(error.message);
	}
}


module.exports = {
	run
};
