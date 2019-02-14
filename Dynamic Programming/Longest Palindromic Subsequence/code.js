const { Array1DTracer, Array2DTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new Array1DTracer('Input Text');
const matrix = new Array2DTracer('Matrix');
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, matrix, logger]));

const seq = 'BBABCBCAB';
let N;
N = seq.length;

const L = new Array(N);

let i;
let j;
for (i = 0; i < N; i++) {
  L[i] = new Array(N);
}
for (i = 0; i < N; i++) {
  L[i][i] = 1;
}

tracer.set(seq);
matrix.set(L);
matrix.delay();

function max(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}
logger.println('LPS for any string with length = 1 is 1');
for (i = 2; i <= N; i++) {
  logger.println('--------------------------------------------------');
  logger.println(`Considering a sub-string of length ${i}`);
  logger.println('--------------------------------------------------');
  for (j = 0; j < N - i + 1; j++) {
    const k = j + i - 1;
    tracer.select(j);
    tracer.delay();
    tracer.patch(k);
    tracer.delay();

    logger.println(`Comparing ${seq[j]} and ${seq[k]}`);

    if (seq[j] === seq[k] && i === 2) {
      logger.println(`They are equal and size of the string in the interval${j} to ${k} is 2, so the Longest Palindromic Subsequence in the Given range is 2`);

      matrix.patch(j, k);
      matrix.delay();

      L[j][k] = 2;
      matrix.set(L);

      matrix.depatch(j, k);
      matrix.delay();
    } else if (seq[j] === seq[k]) {
      logger.println(`They are equal, so the Longest Palindromic Subsequence in the Given range is 2 + the Longest Increasing Subsequence between the indices ${j + 1} to ${k - 1}`);

      matrix.patch(j, k);
      matrix.delay();
      matrix.select(j + 1, k - 1);
      matrix.delay();

      L[j][k] = L[j + 1][k - 1] + 2;
      matrix.set(L);

      matrix.depatch(j, k);
      matrix.delay();
      matrix.deselect(j + 1, k - 1);
      matrix.delay();
    } else {
      logger.println(`They are NOT equal, so the Longest Palindromic Subsequence in the Given range is the maximum Longest Increasing Subsequence between the indices ${j + 1} to ${k} and ${j} to ${k - 1}`);
      matrix.patch(j, k);
      matrix.delay();
      matrix.select(j + 1, k);
      matrix.delay();
      matrix.select(j, k - 1);
      matrix.delay();

      L[j][k] = max(L[j + 1][k], L[j][k - 1]);
      matrix.set(L);

      matrix.depatch(j, k);
      matrix.delay();
      matrix.deselect(j + 1, k);
      matrix.delay();
      matrix.deselect(j, k - 1);
      matrix.delay();
    }
    logger.println('--------------------------------------------------');
    tracer.deselect(j);
    tracer.delay();
    tracer.depatch(k);
    tracer.delay();
  }
}
logger.println(`Longest Increasing Subsequence of the given string = L[0][${N - 1}]=${L[0][N - 1]}`);
