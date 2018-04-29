import { Array2DTracer, Randomize } from 'algorithm-visualizer';

const maxValue = 9;
const arrSize = 10;

// initialize array values
const A = Randomize.array1D(arrSize, { min: 0, max: maxValue });
const counts = [];
const sortedA = [];
for (let i = 0; i <= maxValue; i++) {
  counts[i] = 0;
  if (i < arrSize) sortedA[i] = 0;
}
const D = [
  A,
  counts,
  sortedA,
];

const tracer = new Array2DTracer();
tracer.set(D).wait();

// set counts values
for (let i = 0; i < A.length; i++) {
  tracer.select(0, i).wait();
  counts[A[i]]++;
  tracer.notify(1, A[i], D[1][A[i]]).wait();
  tracer.deselect(0, i);
  tracer.denotify(1, A[i], D[1][A[i]]).wait();
}

// sort
let i = 0;
for (let j = 0; j <= maxValue; j++) {
  while (counts[j] > 0) {
    tracer.select(1, j).wait();
    sortedA[i] = j;
    counts[j]--;
    tracer.notify(1, j, D[1][j]);
    tracer.notify(2, i, D[2][i]).wait();
    tracer.deselect(1, j);
    tracer.denotify(1, j, D[1][j]);
    tracer.denotify(2, i, D[2][i]).wait();
    i++;
  }
}
