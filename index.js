const core = require('@actions/core');
const exec = require('@actions/exec');

try {
  	const prefix = core.getInput('commit-prefix', { required: true });
	console.log(prefix);
	const read_commit = readCommit();
	console.log(read_commit);
	const matcher = new RegExp(`${prefix}.*`);
	console.log(read_commit.match(matcher));
	core.setOutput('updates', "network");
} catch (error) {
  	core.setFailed(error.message);
}

async function readCommit() {
	let log = '';
	const listeners = {
		stdout: (data) => {
			log += data;
		}
	}
	await exec.exec('git log -1 --no-merges --format="%b"');
	return log;
}
