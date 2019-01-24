import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(10).create();
tracer.set(D).delay();

logger.println(`original array = [${D.join(', ')}]`);
const N = D.length;
function flip(start) {
  tracer.select(start, N - 1).delay();
  let idx = 0;
  for (let i = start; i < (start + N) / 2; i++) {
    tracer.select(i).delay();
    const temp = D[i];
    D[i] = D[N - idx - 1];
    D[N - idx - 1] = temp;
    tracer.patch(i, D[i]).patch(N - idx - 1, D[N - idx - 1]).delay();
    tracer.depatch(i).depatch(N - idx - 1);
    tracer.deselect(i);
    idx++;
  }
  tracer.deselect(start, N - 1);
}
for (let i = 0; i < N - 1; i++) {
  logger.println(`round ${i + 1}`);
  const currArr = D.slice(i, N);
  const currMax = currArr.reduce((prev, curr, idx) => ((curr > prev.val) ? { idx, val: curr } : prev), { idx: 0, val: currArr[0] });
  if (currMax.idx !== 0) { // if currMax.idx === 0 that means max element already at the bottom, no flip required
    logger.println(`flip at ${currMax.idx + i} (step 1)`);
    flip(currMax.idx + i, N);
    logger.println(`flip at ${i} (step 2)`);
    flip(i, N);
  }
}
logger.println(`sorted array = [${D.join(', ')}]`);
