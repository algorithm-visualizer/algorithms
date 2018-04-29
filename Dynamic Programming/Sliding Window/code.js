import { Array1DTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const tracer = new Array1DTracer();
const logger = new LogTracer();
const D = Randomize.array1D(20, { min: -5, max: 5 });
tracer.set(D).wait();

let sum = D[0] + D[1] + D[2];
let max = sum;
tracer.select(0, 2);
logger.print(`sum = ${sum}`).wait();
for (let i = 3; i < D.length; i++) {
  sum += D[i] - D[i - 3];
  if (max < sum) max = sum;
  tracer.deselect(i - 3);
  tracer.select(i);
  logger.print(`sum = ${sum}`).wait();
}
tracer.deselect(D.length - 3, D.length - 1);
logger.print(`max = ${max}`);
