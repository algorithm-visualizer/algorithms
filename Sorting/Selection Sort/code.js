const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = Randomize.array1D(15);
tracer.set(D);

logger.print(`original array = [${D.join(', ')}]`);
for (let i = 0; i < D.length - 1; i++) {
  let minJ = i;
  tracer.select(i).wait();
  for (let j = i + 1; j < D.length; j++) {
    	tracer.select(j).wait();
    if (D[j] < D[minJ]) {
      minJ = j;
      tracer.notify(j).wait();
      tracer.denotify(j);
    }
    tracer.deselect(j);
  }
  if (minJ != i) {
    logger.print(`swap ${D[i]} and ${D[minJ]}`);
    const temp = D[i];
    D[i] = D[minJ];
    D[minJ] = temp;
    tracer.notify(i, D[i]).notify(minJ, D[minJ]).wait();
    tracer.denotify(i).denotify(minJ);
  }
  tracer.deselect(i);
}
logger.print(`sorted array = [${D.join(', ')}]`);
