// import visualization libraries {
const { Tracer, Array2DTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');
// }

// define tracer variables {
const tracer = new Array2DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
const integer = Randomize.Integer({ min: 5, max: 14 });;
const D = [];
const A = [];
for (let i = 0; i <= integer; i++) {
  D.push([]);
  D[i][0] = 1
  for (let j = 1; j <= integer; j++) D[i][j] = 0;
}
tracer.set(D);
Tracer.delay();
// }

function partition(A, n, p) {
  // logger {
  if (n === 0) logger.println(`[${A.join(', ')}]`);
  // }
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

  // cycle through each cell of matrix
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i > j)  {
        // visualize {
        tracer.select(i, j);
        Tracer.delay();
        // }
        // set cell to cell above it
        D[i][j] = D[i - 1][j];
        // visualize {
        tracer.patch(i, j, D[i][j]);
        Tracer.delay();
        tracer.depatch(i, j);
        tracer.deselect(i, j);
        // }
      }
      else {
        // visualize {
          tracer.select(i, j);
          Tracer.delay();
        // }
        // grab above cell and add it to previous cell
        const above = D[i - 1][j];
        const left = D[i][j - i];
        D[i][j] = above + left;
        // visualize {
          tracer.patch(i, j, D[i][j]);
          Tracer.delay();
          tracer.depatch(i, j);
          tracer.deselect(i, j);
        // }
      }
    }
  }
  return D[n][n];
}

// logger {
logger.println(`Partitioning: ${integer}`);
// }
partition(A, integer, 0);
const part = integerPartition(integer);
// logger {
logger.println(part);
// }
