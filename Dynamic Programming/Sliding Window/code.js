const { Array1DTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
const D = new Randomize.Array1D(20, new Randomize.Integer(-5, 5)).create();
tracer.set(D).delay();

let sum = D[0] + D[1] + D[2];
let max = sum;
tracer.select(0, 2);
logger.println(`sum = ${sum}`).delay();
for (let i = 3; i < D.length; i++) {
  sum += D[i] - D[i - 3];
  if (max < sum) max = sum;
  tracer.deselect(i - 3);
  tracer.select(i);
  logger.println(`sum = ${sum}`).delay();
}
tracer.deselect(D.length - 3, D.length - 1);
logger.println(`max = ${max}`);
