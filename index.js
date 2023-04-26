const core = require('@actions/core');
const exec = require('@actions/exec');

try {
	action();
	core.setOutput('updates', "network");
} catch (error) {
  	core.setFailed(error.message);
}

async function action() {
  	const prefix = core.getInput('commit-prefix', { required: true });
	console.log(prefix);
	const raw_body = await readCommit();
	const read_commit = raw_body.trimEnd();
	console.log(`
	Next line should be the commit
	${read_commit}
	This line is after the commit
	`);
	const matcher = new RegExp(`${prefix}.*`);
	console.log(read_commit.match(matcher));
}

async function readCommit() {
	let log = '';
	const listeners = {
		stdout: (data) => {
			log += data;
		}
	}
	await exec.exec('git log -1 --no-merges --format="%b"', { listeners });
	return log;
}
