const { Tracer, Array1DTracer, Array2DTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const A = [[2, 3], [3, 4]];
const B = [[1, 0], [1, 2]];
const C = [[6, 5], [8, 7]];

new Array2DTracer('Matrix A').set(A);
new Array2DTracer('Matrix B').set(B);
new Array2DTracer('Matrix C').set(C);

const logger = new LogTracer();

const randomVectorTracer = new Array1DTracer('Random Vector');
const resultVectorTracer = new Array1DTracer('Result Vector');
Layout.setRoot(new VerticalLayout([logger, randomVectorTracer, resultVectorTracer])).delay();

function FreivaldsAlgorithm() {
  let k = 5;
  let i;
  let j;
  let tmp;
  let tmpB;
  let tmpC;
  const n = A.length;

  while (k--) {
    logger.println(`Iterations remained: #${k}`);

    // Generate random vector
    const r = [];

    let P = [];
    for (i = 0; i < n; i++) {
      P.push(-1);
      r.push((Math.random() < 0.5) << 0);
    }
    randomVectorTracer.set(r);
    Tracer.delay();

    // Compute Br, Cr
    const Br = [];

    const Cr = [];
    for (i = 0; i < n; i++) {
      tmpB = 0;
      tmpC = 0;
      for (j = 0; j < n; j++) {
        tmpB += r[j] * B[j][i];
        tmpC += r[j] * C[j][i];
      }
      Br.push(tmpB);
      Cr.push(tmpC);
    }

    // Compute A * Br - Cr
    P = [];
    for (i = 0; i < n; i++) {
      tmp = 0;
      for (j = 0; j < n; j++) {
        tmp += (A[i][j] * Br[i]) - Cr[i];
      }
      P.push(tmp);
    }
    resultVectorTracer.set(P);
    Tracer.delay();

    for (i = 0; i < n; i++) {
      if (P[i] !== 0) {
        logger.println(`P[${i}] !== 0 (${P[i]}), exit`);
        return false;
      }
    }

    logger.println('Result vector is identity, continue...');
  }

  return true;
}

FreivaldsAlgorithm();
