const { Tracer, Array1DTracer, Array2DTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const A = Randomize.Array1D({ N: 7 });
const N = A.length;

const tracer1 = new Array1DTracer('Array');
const tracer2 = new Array2DTracer('Holes');
const logTracer = new LogTracer('Console');
Layout.setRoot(new VerticalLayout([tracer1, tracer2, logTracer]));
tracer1.set(A);
Tracer.delay();

let min = A[0];
let max = A[0];

for (let i = 1; i < N; i++) {
  if (A[i] < min) {
    min = A[i];
  }
  if (A[i] > max) {
    max = A[i];
  }
}
const range = max - min + 1;

const holes = new Array(range);
for (let i = 0; i < range; i++) {
  holes[i] = [];
}
tracer2.set(holes);

logTracer.println('Filling up holes');
for (let i = 0; i < N; i++) {
  tracer1.select(i);
  Tracer.delay();

  holes[A[i] - min].push(A[i]);

  tracer2.set(holes);
  tracer1.deselect(i);
}

logTracer.println('Building sorted array');
let k = 0;
for (let i = 0; i < range; i++) {
  for (let j = 0; j < holes[i].length; j++) {
    tracer2.select(i, j);
    Tracer.delay();
    A[k++] = holes[i][j];
    tracer1.patch(k - 1, A[k - 1]);
    Tracer.delay();
    tracer2.deselect(i, j);
    tracer1.depatch(k - 1);
  }
}

logTracer.println(`Sorted array is ${A}`);
