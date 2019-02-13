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

      const variables = [];
      let lineNumber = -1;
      let needDelay = false;
      const lines = content.split('\n').map((line, i) => {
        const match = /^\s*const (\w+) = new \w*Tracer\(/g.exec(line);
        if (match) {
          variables.push(match[1]);
          lineNumber = i;
          line = line.replace(/\.delay\(\s*\)/g, () => {
            needDelay = true;
            return '';
          });
        }
        return line.replace(' } = require(\'algorithm-visualizer\')', ', Layout, VerticalLayout } = require(\'algorithm-visualizer\')');
      });

      if (~lineNumber) {
        const line = `Layout.setRoot(new VerticalLayout([${variables.join(', ')}]))${needDelay ? '.delay()' : ''};`;
        lines.splice(lineNumber + 1, 0, line);
        const newContent = lines.join('\n');
        fs.writeFileSync(filePath, newContent, 'utf8');
      } else {
        console.error('wtf');
      }
    });
  });
});
