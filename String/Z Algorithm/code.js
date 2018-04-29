import { Array1DTracer, LogTracer, Tracer } from 'algorithm-visualizer';

const textTracer = new Array1DTracer('text');
const pattTracer = new Array1DTracer('pattern');
const concatTracer = new Array1DTracer('concatenated string');
const tracer = new Array1DTracer('zArray');

// let pattern = "aab";
// let text = "aabxaabxcaabxaabxay";
const pattern = 'abc';
const text = 'xabcabzabc';
let i;

const len = pattern.length + text.length + 1;

const z = new Array(len);
z[0] = 0;

pattTracer.set(pattern);
textTracer.set(text);
tracer.set(z);
const logger = new LogTracer();


function createZarr(concat) {
  let i,
    left,
    right,
    k,
    N;
  N = concat.length;
  left = 0;
  right = 0;
  for (i = 1; i < N; i++) {
    tracer.select(i).wait();
    if (i > right) {
      left = right = i;
      while (right < N && concat[right] === concat[right - left]) {
        concatTracer.notify(right).wait();
        concatTracer.select(right - left).wait();
        logger.print(`${concat[right]} ( at position ${right} ) is equal to ${concat[right - left]} (at position ${right - left})`);
        concatTracer.denotify(right).wait();
        concatTracer.deselect(right - left).wait();
        right++;
      }
      concatTracer.notify(right).wait();
      concatTracer.select(right - left).wait();
      logger.print(`${concat[right]} ( at position ${right} ) is NOT equal to ${concat[right - left]} (at position ${right - left})`);
      concatTracer.denotify(right).wait();
      concatTracer.deselect(right - left).wait();
      z[i] = (right - left);
      logger.print('--------------------------------');
      logger.print(`Value of z[${i}] = the length of the substring starting from ${i} which is also the prefix of the concatinated string(=${right - left})`);
      logger.print('--------------------------------');
      right--;
    } else if (z[i - left] < (right - i + 1)) {
      logger.print(`The substring from index ${i - left} will not cross the right end.`);
      concatTracer.select(i - left).wait();
      concatTracer.notify(right - i + 1).wait();
      z[i] = z[i - left];
      concatTracer.deselect(i - left).wait();
      concatTracer.denotify(right - i + 1).wait();
    } else {
      logger.print(`The substring from index ${i - left} will cross the right end.`);
      left = i;
      while (right < N && concat[right] === concat[right - left]) {
        concatTracer.notify(right).wait();
        concatTracer.select(right - left).wait();
        logger.print(`${concat[right]} ( at position ${right} ) is equal to ${concat[right - left]} (at position ${right - left})`);
        concatTracer.denotify(right).wait();
        concatTracer.deselect(right - left).wait();
        right++;
      }
      concatTracer.notify(right).wait();
      concatTracer.select(right - left).wait();
      logger.print(`${concat[right]} ( at position ${right} ) is NOT equal to ${concat[right - left]} (at position ${right - left})`);
      concatTracer.denotify(right).wait();
      concatTracer.deselect(right - left).wait();
      z[i] = (right - left);
      right--;
      logger.print('--------------------------------');
      logger.print(`Value of z[${i}] = the length of the substring starting from ${i} which is also the prefix of the concatinated string(=${right - left})`);
      logger.print('--------------------------------');
    }
    tracer.deselect(i).wait();
    tracer.set(z);
  }
}

const concat = `${pattern}$${text}`;
concatTracer.set(concat);
const patLen = pattern.length;
createZarr(concat);
tracer.set(z);
let i;
logger.print('The Values in Z array equal to the length of the pattern indicates the index at which the pattern is present');
logger.print('===================================');
for (i = 0; i < len; i++) {
  if (z[i] === patLen) {
    const pos = i - (patLen + 1);
    logger.print(`Pattern Found at index ${pos}`);
  }
}
logger.print('===================================');
