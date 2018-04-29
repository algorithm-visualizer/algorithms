import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = Randomize.array1D(15);
tracer.set(D).wait();

logger.print(`original array = [${D.join(', ')}]`);
for (let i = 1; i < D.length; i++) {
  const key = D[i];
  logger.print(`insert ${key}`);
  tracer.select(i).wait();
  let j;
  for (j = i - 1; (j >= 0) && (D[j] > key); j--) {
    D[j + 1] = D[j];
    tracer.notify(j + 1, D[j + 1]).wait();
    tracer.denotify(j + 1);
  }
  D[j + 1] = key;
  tracer.notify(j + 1, D[j + 1]).wait();
  tracer.denotify(j + 1);
  tracer.deselect(i);
}
logger.print(`sorted array = [${D.join(', ')}]`);
