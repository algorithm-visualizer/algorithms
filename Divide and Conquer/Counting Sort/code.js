import { Array2DTracer, Randomize } from 'algorithm-visualizer';

const maxValue = 9;
const arrSize = 10;

// initialize array values
const A = new Randomize.Array1D(arrSize, new Randomize.Integer(0, maxValue)).create();
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
tracer.set(D).delay();

// set counts values
for (let i = 0; i < A.length; i++) {
  tracer.select(0, i).delay();
  counts[A[i]]++;
  tracer.patch(1, A[i], D[1][A[i]]).delay();
  tracer.deselect(0, i);
  tracer.depatch(1, A[i], D[1][A[i]]).delay();
}

// sort
let i = 0;
for (let j = 0; j <= maxValue; j++) {
  while (counts[j] > 0) {
    tracer.select(1, j).delay();
    sortedA[i] = j;
    counts[j]--;
    tracer.patch(1, j, D[1][j]);
    tracer.patch(2, i, D[2][i]).delay();
    tracer.deselect(1, j);
    tracer.depatch(1, j, D[1][j]);
    tracer.depatch(2, i, D[2][i]).delay();
    i++;
  }
}
