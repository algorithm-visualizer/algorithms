import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = Randomize.array1D(15);
tracer.set(D).wait();

logger.print(`original array = [${D.join(', ')}]`);
let N = D.length;
let swapped;
do {
  swapped = false;
  tracer.select(N - 1).wait();
  for (let i = 1; i < N; i++) {
    tracer.select(i).wait();
    if (D[i - 1] > D[i]) {
      logger.print(`swap ${D[i - 1]} and ${D[i]}`);
      const temp = D[i - 1];
      D[i - 1] = D[i];
      D[i] = temp;
      swapped = true;
      tracer.notify(i - 1, D[i - 1]).notify(i, D[i]).wait();
      tracer.denotify(i - 1).denotify(i);
    }
    tracer.deselect(i);
  }
  tracer.deselect(N - 1);
  N--;
} while (swapped);
logger.print(`sorted array = [${D.join(', ')}]`);
