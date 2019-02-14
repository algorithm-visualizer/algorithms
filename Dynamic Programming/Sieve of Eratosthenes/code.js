const { Tracer, Array1DTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new Array1DTracer('Sieve');
const N = 30;
const a = [];
const b = [];
for (let i = 1; i <= N; i++) {
  a.push(i);
  b.push(0);
}
tracer.set(a);
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger])).delay();

logger.println('1 is not prime');
tracer.select(0);
Tracer.delay();
for (let i = 2; i <= N; i++) {
  if (b[i] === 0) {
    logger.println(`${i} is not marked, so it is prime`);
    // a[i-1] is prime mark by red indicators
    tracer.patch(i - 1);
    Tracer.delay();
    for (let j = i + i; j <= N; j += i) {
      b[j] = 1; // a[j-1] is not prime, mark by blue indicators
      logger.println(`${j} is a multiple of ${i} so it is marked as composite`);
      tracer.select(j - 1);
      Tracer.delay();
    }
    tracer.depatch(i - 1);
  }
}
logger.println(`The unmarked numbers are the prime numbers from 1 to ${N}`);
