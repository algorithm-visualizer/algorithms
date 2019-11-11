const path = require('path');
const fs = require('fs-extra');

const { listDirectories, listFiles, signale } = require('./utils');
const { rootDir } = require('./constants');
const validators = require('./validators');

const categories = listDirectories(rootDir).filter(dir => dir !== 'node_modules');
for (const category of categories) {
  const categoryDir = path.resolve(rootDir, category);
  const algorithms = listDirectories(categoryDir);
  for (const algorithm of algorithms) {
    const algorithmDir = path.resolve(categoryDir, algorithm);
    const files = listFiles(algorithmDir);
    for (const file of files) {
      const ext = file.split('.').pop();
      const validator = validators[ext];
      if (validator) {
        const errors = [];
        const error = message => errors.push(message);
        const warns = [];
        const warn = message => warns.push(message);
        const filePath = path.resolve(algorithmDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        validator(error, warn, category, algorithm, file, content)
          .then(() => {
            if (errors.length || warns.length) {
              signale.log(`${category}/${algorithm}/${file}`);
              errors.forEach(error => signale.error(error));
              warns.forEach(error => signale.warn(error));
              signale.log();
            }
            if (errors.length) {
              process.exitCode = 1;
            }
          })
          .catch(console.error);
      }
    }
  }
}
