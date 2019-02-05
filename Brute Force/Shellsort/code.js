const { Array1DTracer, ChartTracer, LogTracer, Randomize } = require('algorithm-visualizer');

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(15).create();
tracer.set(D).delay();

logger.println(`Original array = [${D.join(', ')}]`);
const N = D.length;

for (let gap = N; gap = parseInt(gap / 2);) {
  logger.println('');
  logger.println(`Gap of ${gap}`);
  for (let i = gap; i < N; i++) {
    tracer.select(i).select(i - gap).delay();
    const k = D[i];
    logger.println(`Holding: ${k}`);
    let j;
    for (j = i; j >= gap && k < D[j - gap]; j -= gap) {
      logger.println(`${k} < ${D[j - gap]}`);
      D[j] = D[j - gap];
      tracer.patch(j, D[j]).delay();
      tracer.depatch(j);
    }
    const old = D[j];
    D[j] = k;
    if (old !== k) {
      tracer.patch(j, D[j]).delay();
      tracer.depatch(j);
      logger.println(`Swapped ${D[j]} with ${old}`);
    }

    tracer.deselect(i).deselect(i - gap);
  }
}
logger.println('');
logger.println(`Sorted array = [${D.join(', ')}]`);
