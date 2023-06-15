const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert')
const exec = require('@actions/exec');
const core = require('@actions/core');
const sinon = require('sinon');
const { run } = require('./run.js');

let sandbox, fakePrefix, fakeExec;

beforeEach(() => {
	sandbox = sinon.createSandbox();
	const execFake = sinon.fake();
	fakeExec = sandbox.replace(exec, 'exec', execFake);
	fakePrefix = sandbox.replace(core, 'getInput',
		sinon.fake.returns('prefix'));
});

afterEach(() => {
	sandbox.restore();
});


test('throw error on bad prefix', () => {
	const error_message = 'Input required and not supplied: prefix';
	sandbox.restore();
	const error = sandbox.replace(core, 'setFailed', sinon.fake());
	run();
	assert.equal(error.firstArg, error_message);
});

test('get the required prefix input', () => {
	run();
	assert.equal(fakePrefix.firstArg, 'prefix');
	assert.deepEqual(fakePrefix.lastArg, { required: true });
});

test('execute git log', () => {
	run();
	const last_exec = fakeExec.lastCall;
	assert.equal(last_exec.args[0], 'git log');
	assert.deepEqual(last_exec.args[1],
		['-1', '--no-merges', '--format="%b"']
	);
});



