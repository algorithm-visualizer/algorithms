const { MAX_STEPS } = require('../constants');

function ensureCodeFoldings(error, warn, content) {
  if (!/\/\/ import visualization libraries {/.test(content)) {
    error('Missing the code folding for importing visualization libraries.');
  }
  if (!/\/\/ define tracer variables {/.test(content)) {
    error('Missing the code folding for defining tracer variables.');
  }
  if (!/\/\/ visualize {/.test(content)) {
    error('Missing the code folding for visualizing.');
  }
}

function ensureMaxSteps(error, warn, commands) {
  const steps = commands.filter(command => command.method === 'delay').length;
  if (steps > MAX_STEPS) {
    warn('Too many steps.');
  }
}

module.exports = {
  ensureCodeFoldings,
  ensureMaxSteps,
};
