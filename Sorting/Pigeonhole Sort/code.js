const A = Randomize.array1D(7);
const N = A.length;

const tracer1 = new Array1DTracer('Array').set(A);
const tracer2 = new Array2DTracer('Holes');
const logTracer = new LogTracer('Console');

let min = A[0];
let max = A[0];

for (var i = 1; i < N; i++) {
  if (A[i] < min) {
    min = A[i];
  }
  if (A[i] > max) {
    max = A[i];
  }
}
const range = max - min + 1;

const holes = new Array(range);
for (var i = 0; i < range; i++) {
  holes[i] = [];
}
tracer2.set(holes);

logTracer.print('Filling up holes');
for (var i = 0; i < N; i++) {
  tracer1.select(i).wait();

  holes[A[i] - min].push(A[i]);

  tracer2.set(holes);
  tracer1.deselect(i);
}

logTracer.print('Building sorted array');
let k = 0;
for (var i = 0; i < range; i++) {
  for (let j = 0; j < holes[i].length; j++) {
    tracer2.select(i, j).wait();
    A[k++] = holes[i][j];
    tracer1.notify(k - 1, A[k - 1]).wait();
    tracer2.deselect(i, j);
    tracer1.denotify(k - 1);
  }
}

logTracer.print(`Sorted array is ${A}`);
