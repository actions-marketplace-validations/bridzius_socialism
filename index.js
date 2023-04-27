const core = require('@actions/core');
const exec = require('@actions/exec');

try {
	action();
} catch (error) {
  	core.setFailed(error.message);
}

async function action() {
  	const prefix = core.getInput('prefix', { required: true });
	const raw_body = await readCommit();
	const read_commit = raw_body.trimEnd();
	const matcher = new RegExp(`(?<=${prefix}).*`);
	const post = read_commit.match(matcher);
	if(post !== null) {
		core.setOutput('post', post[0].trimStart());
	}
}

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
