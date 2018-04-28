const A = [[2, 3], [3, 4]];
const B = [[1, 0], [1, 2]];
const C = [[6, 5], [8, 7]];

const _a = new Array2DTracer('Matrix A'); _a.set(A);
const _b = new Array2DTracer('Matrix B'); _b.set(B);
const _c = new Array2DTracer('Matrix C'); _c.set(C);

const logger = new LogTracer();

const _r = new Array1DTracer('Random Vector');
const _p = new Array1DTracer('Result Vector');


function FreivaldsAlgorithm() {
  let k = 5;
  let i,
    j,
    tmp,
    tmpB,
    tmpC,
    n = A.length;

  while (k--) {
    logger.print(`Iterations remained: #${k}`);

    // Generate random vector
    let r = [],
      P = [];
    for (i = 0; i < n; i++) {
      P.push(-1);
      r.push((Math.random() < 0.5) << 0);
    }
    _r.set(r).wait();

    // Compute Br, Cr
    let Br = [],
      Cr = [];
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
    _p.set(P).wait();

    for (i = 0; i < n; i++) {
      if (P[i] !== 0) {
        logger.print(`P[${i}] !== 0 (${P[i]}), exit`);
        return false;
      }
    }

    logger.print('Result vector is identity, continue...');
  }

  return true;
}

FreivaldsAlgorithm();
