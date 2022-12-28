const core = require('@actions/core');

try {
  core.getInput('commit-prefix', { required: true });
} catch (error) {
  core.setFailed(error.message);
}
