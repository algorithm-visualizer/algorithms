const { Tracer, Array2DTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new Array2DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
const integer = Randomize.Integer({ min: 5, max: 14 });
const D = [];
const A = [];
for (let i = 0; i <= integer; i++) {
  D.push([]);
  D[0][i] = 1;
  D[i][1] = 1;
  for (let j = 0; j <= integer; j++) D[i][j] = 0;
}
tracer.set(D);
Tracer.delay();

function partition(A, n, p) {
  if (n === 0) logger.println(`[${A.join(', ')}]`);
  else {
    let end = n;
    if (p !== 0 && A[p - 1] < n) end = A[p - 1];
    for (let i = end; i > 0; i--) {
      A[p] = i;
      partition(A, n - i, p + 1);
    }
  }
}

function integerPartition(n) {
  // Calculate number of partitions for all numbers from 1 to n
  for (let i = 2; i <= n; i++) {
    // We are allowed to use numbers from 2 to i
    for (let j = 1; j <= i; j++) {
      // Number of partitions without j number + number of partitions with max j
      tracer.select(i, j);
      Tracer.delay();
      D[i][j] = D[i][j - 1] + D[i - j][Math.max(j, i - j)];
      tracer.patch(i, j, D[i][j]);
      Tracer.delay();
      tracer.depatch(i, j);
      tracer.deselect(i, j);
    }
  }
  return D[n][n];
}

logger.println(`Partitioning: ${integer}`);
partition(A, integer, 0);
const part = integerPartition(integer);
logger.println(part);
