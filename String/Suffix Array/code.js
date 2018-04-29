import { Array1DTracer, Array2DTracer, LogTracer, Tracer } from 'algorithm-visualizer';

let word = 'virgo';
const suffixArray = (function skeleton(word) {
  const arr = [];

  for (let i = 1; i <= word.length + 1; i++) {
    arr.push([i, '-']);
  }

  return arr;
}(word));

let saTracer = new Array2DTracer('Suffix Array'),
  wordTracer = new Array1DTracer('Given Word'),
  logger = new LogTracer('Progress');

saTracer.set(suffixArray);
wordTracer.set(word);

word += '$';	// special character
logger.print('Appended \'$\' at the end of word as terminating (special) character. Beginning filling of suffixes');

function selectSuffix(word, i) {
  let c = i;

  while (i < word.length - 1) {
    wordTracer.select(i);
    i++;
  }
  wordTracer.wait();

  while (c < word.length - 1) {
    wordTracer.deselect(c);
    c++;
  }
  wordTracer.wait();
}

(function createSA(sa, word) {
  for (let i = 0; i < word.length; i++) {
    sa[i][1] = word.slice(i);

    selectSuffix(word, i);
    saTracer.notify(i, 1, sa[i][1]).wait();
    saTracer.denotify(i, 1).wait();
  }
}(suffixArray, word));

logger.print('Re-organizing Suffix Array in sorted order of suffixes using efficient sorting algorithm (O(N.log(N)))');
suffixArray.sort((a, b) => {
  logger.print(`The condition a [1] (${a[1]}) > b [1] (${b[1]}) is ${a[1] > b[1]}`);
  return a[1] > b[1];
});

for (let i = 0; i < word.length; i++) {
  saTracer.notify(i, 0, suffixArray[i][0]);
  saTracer.notify(i, 1, suffixArray[i][1]).wait();

  saTracer.denotify(i, 0);
  saTracer.denotify(i, 1);
}
