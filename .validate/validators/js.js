process.env.ALGORITHM_VISUALIZER = '1';

const path = require('path');
const { ensureMaxSteps, ensureCodeFoldings } = require('./common');
const { Commander } = require('algorithm-visualizer');
const { rootDir } = require('../constants');

module.exports = async (error, warn, category, algorithm, file, content) => {
  try {
    Commander.init();
    require(path.resolve(rootDir, category, algorithm, file));
    ensureMaxSteps(error, warn, Commander.commands);
  } catch (e) {
    error(e);
  }
  ensureCodeFoldings(error, warn, content);
};
