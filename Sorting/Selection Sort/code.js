import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = Randomize.array1D(15);
tracer.set(D).delay();

logger.print(`original array = [${D.join(', ')}]`);
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
    logger.print(`swap ${D[i]} and ${D[minJ]}`);
    const temp = D[i];
    D[i] = D[minJ];
    D[minJ] = temp;
    tracer.patch(i, D[i]).patch(minJ, D[minJ]).delay();
    tracer.depatch(i).depatch(minJ);
  }
  tracer.deselect(i);
}
logger.print(`sorted array = [${D.join(', ')}]`);
