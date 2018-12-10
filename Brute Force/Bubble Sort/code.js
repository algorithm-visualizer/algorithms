import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(15).create();
tracer.set(D).delay();

logger.print(`original array = [${D.join(', ')}]`);
let N = D.length;
let swapped;
do {
  swapped = false;
  tracer.select(N - 1).delay();
  for (let i = 1; i < N; i++) {
    tracer.select(i).delay();
    if (D[i - 1] > D[i]) {
      logger.print(`swap ${D[i - 1]} and ${D[i]}`);
      const temp = D[i - 1];
      D[i - 1] = D[i];
      D[i] = temp;
      swapped = true;
      tracer.patch(i - 1, D[i - 1]).patch(i, D[i]).delay();
      tracer.depatch(i - 1).depatch(i);
    }
    tracer.deselect(i);
  }
  tracer.deselect(N - 1);
  N--;
} while (swapped);
logger.print(`sorted array = [${D.join(', ')}]`);
