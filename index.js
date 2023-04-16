const core = require('@actions/core');

try {
  	const commit = core.getInput('commit-prefix', { required: true });
	console.log(commit);
	core.setOutput('updates', "network");
} catch (error) {
  	core.setFailed(error.message);
}
