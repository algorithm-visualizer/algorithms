const path = require('path');
const fs = require('fs-extra');

const { listDirectories, listFiles } = require('./utils');
const { rootDir } = require('./constants');
const validate = {
  js: require('./js'),
};

const categories = listDirectories(rootDir).filter(dir => dir !== 'node_modules');
let hasError = false;
for (const category of categories) {
  const categoryDir = path.resolve(rootDir, category);
  const algorithms = listDirectories(categoryDir);
  for (const algorithm of algorithms) {
    const algorithmDir = path.resolve(categoryDir, algorithm);
    const files = listFiles(algorithmDir);
    for (const file of files) {
      const ext = file.split('.').pop();
      const validator = validate[ext];
      if (validator) {
        const filePath = path.resolve(algorithmDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        if (!validator(category, algorithm, file, content)) {
          hasError = true;
        }
      }
    }
  }
}

process.exit(hasError ? 1 : 0);
