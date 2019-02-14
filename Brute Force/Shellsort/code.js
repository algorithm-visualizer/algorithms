const { Tracer, Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const chart = new ChartTracer();
const tracer = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
const D = new Randomize.Array1D(15).create();
tracer.set(D);
tracer.chart(chart);
Tracer.delay();

logger.println(`Original array = [${D.join(', ')}]`);
const N = D.length;

for (let gap = N; gap = parseInt(gap / 2);) {
  logger.println('');
  logger.println(`Gap of ${gap}`);
  for (let i = gap; i < N; i++) {
    tracer.select(i);
    tracer.select(i - gap);
    Tracer.delay();
    const k = D[i];
    logger.println(`Holding: ${k}`);
    let j;
    for (j = i; j >= gap && k < D[j - gap]; j -= gap) {
      logger.println(`${k} < ${D[j - gap]}`);
      D[j] = D[j - gap];
      tracer.patch(j, D[j]);
      Tracer.delay();
      tracer.depatch(j);
    }
    const old = D[j];
    D[j] = k;
    if (old !== k) {
      tracer.patch(j, D[j]);
      Tracer.delay();
      tracer.depatch(j);
      logger.println(`Swapped ${D[j]} with ${old}`);
    }

    tracer.deselect(i);
    tracer.deselect(i - gap);
  }
}
logger.println('');
logger.println(`Sorted array = [${D.join(', ')}]`);
