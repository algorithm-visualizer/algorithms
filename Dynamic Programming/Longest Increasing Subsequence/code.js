import { Array1DTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const tracer = new Array1DTracer();
const logger = new LogTracer();
const A = Randomize.array1D(10, { min: 0, max: 10 });
const LIS = new Array(A.length);
tracer.set(A).delay();

// Initialize LIS values for all indexes
for (let i = 0; i < A.length; i++) {
  LIS[i] = 1;
}

logger.print('Calculating Longest Increasing Subsequence values in bottom up manner ');
// Compute optimized LIS values in bottom up manner
for (let i = 1; i < A.length; i++) {
  tracer.select(i);
  logger.print(` LIS[${i}] = ${LIS[i]}`);
  for (let j = 0; j < i; j++) {
    tracer.patch(j).delay();
    tracer.depatch(j);
    if (A[i] > A[j] && LIS[i] < LIS[j] + 1) {
      LIS[i] = LIS[j] + 1;
      logger.print(` LIS[${i}] = ${LIS[i]}`);
    }
  }
  tracer.deselect(i);
}

// Pick maximum of all LIS values
logger.print('Now calculate maximum of all LIS values ');
let max = LIS[0];
for (let i = 1; i < A.length; i++) {
  if (max < LIS[i]) {
    max = LIS[i];
  }
}
logger.print(`Longest Increasing Subsequence = max of all LIS = ${max}`);
