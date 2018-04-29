const N = 10;
const A = new Array(N + 1);
for (let i = N; i >= 0; i--) {
  A[i] = 0;
}

const tracer = new Array1DTracer(' Catalan Numbers ').set(A);
const logger = new LogTracer();

A[0] = 1;
tracer.notify(0, A[0]).wait();
tracer.denotify(0);
A[1] = 1;
tracer.notify(1, A[1]).wait();
tracer.denotify(1);

for (let i = 2; i <= N; i++) {
  for (let j = 0; j < i; j++) {
    A[i] += A[j] * A[i - j - 1];
    tracer.select(j).wait();
    tracer.select(i - j - 1).wait();
    tracer.notify(i, A[i]).wait();
    tracer.deselect(j);
    tracer.deselect(i - j - 1);
    tracer.denotify(i);
  }
}

logger.print(` The ${N}th Catalan Number is ${A[N]}`);
tracer.select(N).wait();
