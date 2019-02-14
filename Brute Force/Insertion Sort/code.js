const { Tracer, Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const chart = new ChartTracer();
const tracer = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
const D = new Randomize.Array1D(15).create();
tracer.set(D);
tracer.chart(chart);
Tracer.delay();

logger.println(`original array = [${D.join(', ')}]`);
for (let i = 1; i < D.length; i++) {
  const key = D[i];
  logger.println(`insert ${key}`);
  tracer.select(i);
  Tracer.delay();
  let j;
  for (j = i - 1; (j >= 0) && (D[j] > key); j--) {
    D[j + 1] = D[j];
    tracer.patch(j + 1, D[j + 1]);
    Tracer.delay();
    tracer.depatch(j + 1);
  }
  D[j + 1] = key;
  tracer.patch(j + 1, D[j + 1]);
  Tracer.delay();
  tracer.depatch(j + 1);
  tracer.deselect(i);
}
logger.println(`sorted array = [${D.join(', ')}]`);
