const text_tracer = new Array1DTracer('text');
const patt_tracer = new Array1DTracer('pattern');
const concat_tracer = new Array1DTracer('concatenated string');
const tracer = new Array1DTracer('z_array');

// var pattern = "aab";
// var text = "aabxaabxcaabxaabxay";
const pattern = 'abc';
const text = 'xabcabzabc';
var i;

const len = pattern.length + text.length + 1;

const z = new Array(len);
z[0] = 0;

patt_tracer.set(pattern);
text_tracer.set(text);
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
      while (right < N && concat[right] == concat[right - left]) {
        concat_tracer.notify(right).wait();
        concat_tracer.select(right - left).wait();
        logger.print(`${concat[right]} ( at position ${right} ) is equal to ${concat[right - left]} (at position ${right - left})`);
        concat_tracer.denotify(right).wait();
        concat_tracer.deselect(right - left).wait();
        right++;
      }
      concat_tracer.notify(right).wait();
      concat_tracer.select(right - left).wait();
      logger.print(`${concat[right]} ( at position ${right} ) is NOT equal to ${concat[right - left]} (at position ${right - left})`);
      concat_tracer.denotify(right).wait();
      concat_tracer.deselect(right - left).wait();
      z[i] = (right - left);
      logger.print('--------------------------------');
      logger.print(`Value of z[${i}] = the length of the substring starting from ${i} which is also the prefix of the concatinated string(=${right - left})`);
      logger.print('--------------------------------');
      right--;
    } else if (z[i - left] < (right - i + 1)) {
      logger.print(`The substring from index ${i - left} will not cross the right end.`);
      concat_tracer.select(i - left).wait();
      concat_tracer.notify(right - i + 1).wait();
      z[i] = z[i - left];
      concat_tracer.deselect(i - left).wait();
      concat_tracer.denotify(right - i + 1).wait();
    } else {
      logger.print(`The substring from index ${i - left} will cross the right end.`);
      left = i;
      while (right < N && concat[right] == concat[right - left]) {
        concat_tracer.notify(right).wait();
        concat_tracer.select(right - left).wait();
        logger.print(`${concat[right]} ( at position ${right} ) is equal to ${concat[right - left]} (at position ${right - left})`);
        concat_tracer.denotify(right).wait();
        concat_tracer.deselect(right - left).wait();
        right++;
      }
      concat_tracer.notify(right).wait();
      concat_tracer.select(right - left).wait();
      logger.print(`${concat[right]} ( at position ${right} ) is NOT equal to ${concat[right - left]} (at position ${right - left})`);
      concat_tracer.denotify(right).wait();
      concat_tracer.deselect(right - left).wait();
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
concat_tracer.set(concat);
const patLen = pattern.length;
createZarr(concat);
tracer.set(z);
var i;
logger.print('The Values in Z array equal to the length of the pattern indicates the index at which the pattern is present');
logger.print('===================================');
for (i = 0; i < len; i++) {
  if (z[i] == patLen) {
    const pos = i - (patLen + 1);
    logger.print(`Pattern Found at index ${pos}`);
  }
}
logger.print('===================================');
