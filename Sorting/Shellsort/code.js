import { Array1DTracer, ChartTracer, LogTracer, Randomize, Tracer } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = Randomize.array1D(15);
tracer.set(D);


logger.print(`Original array = [${D.join(', ')}]`);
const N = D.length;

for (let gap = N; gap = parseInt(gap / 2);) {
  logger.print('');
  logger.print(`Gap of ${gap}`);
  for (let i = gap; i < N; i++) {
    tracer.select(i).select(i - gap).wait();
    const k = D[i];
    logger.print(`Holding: ${k}`);
    for (let j = i; j >= gap && k < D[j - gap]; j -= gap) {
      logger.print(`${k} < ${D[j - gap]}`);
      D[j] = D[j - gap];
      tracer.notify(j, D[j]).wait();
      tracer.denotify(j);
    }
    const old = D[j];
    D[j] = k;
    if (old !== k) {
      tracer.notify(j, D[j]).wait();
      tracer.denotify(j);
      logger.print(`Swapped ${D[j]} with ${old}`);
    }

    tracer.deselect(i).deselect(i - gap);
  }
}
tracer.clear();
logger.print('');
logger.print(`Sorted array = [${D.join(', ')}]`);
