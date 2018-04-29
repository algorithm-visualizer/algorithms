const N = 9;
const A = new Array(N);
for (let i = N - 1; i >= 0; i--) {
  A[i] = new Array(N);
}

const tracer = new Array2DTracer('Pascal\'s Triangle').set(A);


for (let i = 0; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    if (j === i || j === 0) { // First and last values in every row are 1
      A[i][j] = 1;

      tracer.notify(i, j, A[i][j]).wait();
      tracer.denotify(i, j);
    } else { // Other values are sum of values just above and left of above
      tracer.select(i - 1, j - 1).wait();
      tracer.select(i - 1, j).wait();

      A[i][j] = A[i - 1][j - 1] + A[i - 1][j];

      tracer.notify(i, j, A[i][j]).wait();
      tracer.denotify(i, j);
      tracer.deselect(i - 1, j - 1);
      tracer.deselect(i - 1, j);
    }
  }
}
