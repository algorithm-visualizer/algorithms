const path = require('path');
const { Commander } = require('algorithm-visualizer');
const { rootDir } = require('../constants');
const { signale } = require('../utils');
const { MAX_STEPS } = require('../constants');

module.exports = (category, algorithm, file, content) => {
  const errors = [];
  const error = message => errors.push(message);
  const warns = [];
  const warn = message => warns.push(message);

  try {
    Commander.init();
    require(path.resolve(rootDir, category, algorithm, file));
  } catch (e) {
    error(e);
  }
  const steps = Commander.commands.filter(command => command.method === 'delay').length;
  if (steps > MAX_STEPS) {
    warn('Too many steps.');
  }
  if (!/\/\/ import visualization libraries {/.test(content)) {
    error('Missing the code folding for importing visualization libraries.');
  }
  if (!/\/\/ define tracer variables {/.test(content)) {
    error('Missing the code folding for defining tracer variables.');
  }
  if (!/\/\/ visualize {/.test(content)) {
    error('Missing the code folding for visualizing.');
  }

  if (errors.length || warns.length) {
    signale.log(`${category}/${algorithm}/${file}`);
    warns.forEach(error => signale.warn(error));
    errors.forEach(error => signale.error(error));
    signale.log();
  }
  return errors.length === 0;
};
