const core = require('@actions/core');
const exec = require('@actions/exec');

try {
  	const commit = core.getInput('commit-prefix', { required: true });
	execute();
	core.setOutput('updates', "network");
} catch (error) {
  	core.setFailed(error.message);
}

async function execute() {
	await exec.exec('git log');
}
