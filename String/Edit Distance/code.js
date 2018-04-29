import { Array2DTracer, LogTracer, Tracer } from 'algorithm-visualizer';

const tracer = new Array2DTracer('Distance Table');
const logger = new LogTracer();
let str1 = 'stack',
  str2 = 'racket',
  table = new Array(str1.length + 1);

table[0] = Array(...{ length: str2.length + 1 }).map(Number.call, Number);
for (let i = 1; i < str1.length + 1; i++) {
  table[i] = Array(...Array(str2.length + 1)).map(Number.prototype.valueOf, -1);
  table[i][0] = i;
}

tracer.set(table);


logger.print('Initialized DP Table');
logger.print(`Y-Axis (Top to Bottom): ${str1}`);
logger.print(`X-Axis (Left to Right): ${str2}`);

const dist = (function editDistance(str1, str2, table) {
  // display grid with words
  logger.print(`*** ${str2.split('').join(' ')}`);
  table.forEach((item, index) => {
    const character = (index === 0) ? '*' : str1[index - 1];
    logger.print(`${character}\t${item}`);
  });

  // begin ED execution
  for (let i = 1; i < str1.length + 1; i++) {
    for (let j = 1; j < str2.length + 1; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        tracer.select(i - 1, j - 1).wait();
        table[i][j] = table[i - 1][j - 1];
        tracer.notify(i, j, table[i][j]).wait();
        tracer.denotify(i, j);
        tracer.deselect(i - 1, j - 1);
      } else {
        tracer.select(i - 1, j);
        tracer.select(i, j - 1);
        tracer.select(i - 1, j - 1).wait();
        table[i][j] = Math.min(table[i - 1][j], table[i][j - 1], table[i - 1][j - 1]) + 1;
        tracer.notify(i, j, table[i][j]).wait();
        tracer.denotify(i, j);
        tracer.deselect(i - 1, j);
        tracer.deselect(i, j - 1);
        tracer.deselect(i - 1, j - 1);
      }
    }
  }

  tracer.select(str1.length, str2.length);
  return table[str1.length][str2.length];
}(str1, str2, table));

logger.print(`Minimum Edit Distance: ${dist}`);
