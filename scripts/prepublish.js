/* eslint-disable no-console */
/* eslint-disable no-undef */
require('shelljs/global');

console.info('--- PREPUBLISH ...');
const noError = result => result.code === 0;

const execOrDie = (cmd, text) => (noError(exec(cmd)) ? console.info(text) : exit(-1));

execOrDie('npm run -s clean', '--- Clean OK ---');
execOrDie('npm run -s build', '--- Build OK ---');
execOrDie('npm run -s test', '--- Tests OK ---');
execOrDie('npm run -s lint', '--- Lint OK ---');
echo('... Prepublish OK ---');
