import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = Randomize.array1D(10);
tracer.set(D).wait();

logger.print(`original array = [${D.join(', ')}]`);
const N = D.length;
function flip(start) {
  tracer.select(start, N).wait();
  let idx = 0;
  for (let i = start; i < (start + N) / 2; i++) {
    tracer.select(i).wait();
    const temp = D[i];
    D[i] = D[N - idx - 1];
    D[N - idx - 1] = temp;
    idx++;
    tracer.notify(i, D[i]).notify(N - idx, D[N - idx]).wait();
    tracer.denotify(i).denotify(N - idx);
    tracer.deselect(i);
  }
  tracer.deselect(start, N);
}
for (let i = 0; i < N - 1; i++) {
  logger.print(`round ${i + 1}`);
  const currArr = D.slice(i, N);
  const currMax = currArr.reduce((prev, curr, idx) => ((curr > prev.val) ? { idx, val: curr } : prev), { idx: 0, val: currArr[0] });
  if (currMax.idx !== 0) { // if currMax.idx === 0 that means max element already at the bottom, no flip required
    logger.print(`flip at ${currMax.idx + i} (step 1)`);
    flip(currMax.idx + i, N);
    logger.print(`flip at ${i} (step 2)`);
    flip(i, N);
  }
}
logger.print(`sorted array = [${D.join(', ')}]`);
