const path = require('path');
const fs = require('fs');

const isDirectory = dirPath => fs.lstatSync(dirPath).isDirectory();
const listFiles = dirPath => fs.readdirSync(dirPath).filter(fileName => !fileName.startsWith('.'));
const listDirectories = dirPath => listFiles(dirPath).filter(fileName => isDirectory(path.resolve(dirPath, fileName)));

const rootPath = path.resolve(__dirname, '..');
listDirectories(rootPath).forEach(category => {
  const categoryPath = path.resolve(rootPath, category);
  listDirectories(categoryPath).forEach(algorithm => {
    const algorithmPath = path.resolve(categoryPath, algorithm);
    listFiles(algorithmPath).filter(file => /\.js$/.test(file)).forEach(file => {
      const filePath = path.resolve(algorithmPath, file);
      const content = fs.readFileSync(filePath, 'utf8');

      /*
      TODO:
        1. Break method chains (except for directed()/weighted()/layout*()
        2. Call static method delay() instead of member method delay()
      */

      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('Randomize')) continue;
        const match = /^(\s*)(\w+)(\.\w+\([^(]*\))(\.\w+\([^(]*\))(.+)$/.exec(line);
        if (match) {
          const [, first, variable, method1, method2, last] = match;
          const firstLine = `${first}${variable}${method1};`;
          const secondLine = `${first}${variable}${method2}${last}`;
          lines.splice(i, 1, firstLine, secondLine);
        }
      }

      const newContent = lines.join('\n');
      if (newContent !== content) {
        console.log(newContent);
        console.log('------------------------------------------------------------');
        fs.writeFileSync(filePath, newContent, 'utf8');
      }
    });
  });
});
