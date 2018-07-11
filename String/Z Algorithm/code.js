import { Array1DTracer, LogTracer } from 'algorithm-visualizer';

const textTracer = new Array1DTracer('text');
const pattTracer = new Array1DTracer('pattern');
const concatTracer = new Array1DTracer('concatenated string');
const tracer = new Array1DTracer('zArray');

// let pattern = "aab";
// let text = "aabxaabxcaabxaabxay";
const pattern = 'abc';
const text = 'xabcabzabc';

const len = pattern.length + text.length + 1;

const z = new Array(len);
z[0] = 0;

pattTracer.set(pattern);
textTracer.set(text);
tracer.set(z);
const logger = new LogTracer().delay();


function createZarr(concat) {
  let left;
  let right;
  let N;
  N = concat.length;
  left = 0;
  right = 0;
  for (let i = 1; i < N; i++) {
    tracer.select(i).delay();
    if (i > right) {
      left = right = i;
      while (right < N && concat[right] === concat[right - left]) {
        concatTracer.patch(right).delay();
        concatTracer.select(right - left).delay();
        logger.print(`${concat[right]} ( at position ${right} ) is equal to ${concat[right - left]} (at position ${right - left})`);
        concatTracer.depatch(right).delay();
        concatTracer.deselect(right - left).delay();
        right++;
      }
      concatTracer.patch(right).delay();
      concatTracer.select(right - left).delay();
      logger.print(`${concat[right]} ( at position ${right} ) is NOT equal to ${concat[right - left]} (at position ${right - left})`);
      concatTracer.depatch(right).delay();
      concatTracer.deselect(right - left).delay();
      z[i] = (right - left);
      logger.print('--------------------------------');
      logger.print(`Value of z[${i}] = the length of the substring starting from ${i} which is also the prefix of the concatinated string(=${right - left})`);
      logger.print('--------------------------------');
      right--;
    } else if (z[i - left] < (right - i + 1)) {
      logger.print(`The substring from index ${i - left} will not cross the right end.`);
      concatTracer.select(i - left).delay();
      concatTracer.patch(right - i + 1).delay();
      z[i] = z[i - left];
      concatTracer.deselect(i - left).delay();
      concatTracer.depatch(right - i + 1).delay();
    } else {
      logger.print(`The substring from index ${i - left} will cross the right end.`);
      left = i;
      while (right < N && concat[right] === concat[right - left]) {
        concatTracer.patch(right).delay();
        concatTracer.select(right - left).delay();
        logger.print(`${concat[right]} ( at position ${right} ) is equal to ${concat[right - left]} (at position ${right - left})`);
        concatTracer.depatch(right).delay();
        concatTracer.deselect(right - left).delay();
        right++;
      }
      concatTracer.patch(right).delay();
      concatTracer.select(right - left).delay();
      logger.print(`${concat[right]} ( at position ${right} ) is NOT equal to ${concat[right - left]} (at position ${right - left})`);
      concatTracer.depatch(right).delay();
      concatTracer.deselect(right - left).delay();
      z[i] = (right - left);
      right--;
      logger.print('--------------------------------');
      logger.print(`Value of z[${i}] = the length of the substring starting from ${i} which is also the prefix of the concatinated string(=${right - left})`);
      logger.print('--------------------------------');
    }
    tracer.deselect(i).delay();
    tracer.set(z);
  }
}

const concat = `${pattern}$${text}`;
concatTracer.set(concat);
const patLen = pattern.length;
createZarr(concat);
tracer.set(z);
logger.print('The Values in Z array equal to the length of the pattern indicates the index at which the pattern is present');
logger.print('===================================');
for (let i = 0; i < len; i++) {
  if (z[i] === patLen) {
    const pos = i - (patLen + 1);
    logger.print(`Pattern Found at index ${pos}`);
  }
}
logger.print('===================================');
