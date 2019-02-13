const { Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
const D = new Randomize.Array1D(15).create();
tracer.set(D).delay();

logger.println(`original array = [${D.join(', ')}]`);
for (let i = 0; i < D.length - 1; i++) {
  let minJ = i;
  tracer.select(i).delay();
  for (let j = i + 1; j < D.length; j++) {
    tracer.select(j).delay();
    if (D[j] < D[minJ]) {
      minJ = j;
      tracer.patch(j).delay();
      tracer.depatch(j);
    }
    tracer.deselect(j);
  }
  if (minJ !== i) {
    logger.println(`swap ${D[i]} and ${D[minJ]}`);
    const temp = D[i];
    D[i] = D[minJ];
    D[minJ] = temp;
    tracer.patch(i, D[i]).patch(minJ, D[minJ]).delay();
    tracer.depatch(i).depatch(minJ);
  }
  tracer.deselect(i);
}
logger.println(`sorted array = [${D.join(', ')}]`);
