import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(15).create();
tracer.set(D).delay();

logger.println(`original array = [${D.join(', ')}]`);

function partition(D, low, high) {
  let i;
  let j;
  let s;
  while (high > low) {
    i = low;
    j = high;
    s = D[low];
    while (i < j) {
      tracer.select(high).select(low).delay();
      while (D[j] > s) {
        tracer.select(j).delay();
        tracer.deselect(j);
        j--;
      }
      D[i] = D[j];
      tracer.patch(i, D[j]).delay().depatch(i);
      while (s >= D[i] && i < j) {
        tracer.select(i).delay();
        tracer.deselect(i);
        i++;
      }
      D[j] = D[i];
      tracer.patch(j, D[i]).delay().depatch(j);
      tracer.deselect(high).deselect(low);
    }
    D[i] = s;
    tracer.patch(i, s).delay();
    tracer.depatch(i);
    partition(D, low, i - 1);
    low = i + 1;
  }
}

function quicksort(D) {
  partition(D, 0, D.length - 1);
}

quicksort(D);
logger.println(`sorted array = [${D.join(', ')}]`);
