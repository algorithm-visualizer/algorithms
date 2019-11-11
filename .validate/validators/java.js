const rp = require('request-promise');
const { ensureMaxSteps, ensureCodeFoldings } = require('./common');

module.exports = async (error, warn, category, algorithm, file, content) => {
  try {
    // TODO: Cache the response and restore if sha of the content matches
    const commands = await rp({
      method: 'POST',
      uri: 'https://algorithm-visualizer.org/api/tracers/java',
      form: { code: content },
      json: true,
    });
    ensureMaxSteps(error, warn, commands);
  } catch (e) {
    error(e);
  }
  ensureCodeFoldings(error, warn, content);
};
