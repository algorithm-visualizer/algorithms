import { Array1DTracer, LogTracer } from 'algorithm-visualizer';

const tracer = new Array1DTracer('Sieve');
const N = 30;
const a = [];
const b = [];
for (let i = 1; i <= N; i++) {
  a.push(i);
  b.push(0);
}
tracer.set(a);
const logger = new LogTracer().delay();

logger.print('1 is not prime');
tracer.select(0).delay();
for (let i = 2; i <= N; i++) {
  if (b[i] === 0) {
    logger.print(`${i} is not marked, so it is prime`);
    // a[i-1] is prime mark by red indicators
    tracer.patch(i - 1).delay();
    for (let j = i + i; j <= N; j += i) {
      b[j] = 1; // a[j-1] is not prime, mark by blue indicators
      logger.print(`${j} is a multiple of ${i} so it is marked as composite`);
      tracer.select(j - 1).delay();
    }
    tracer.depatch(i - 1);
  }
}
logger.print(`The unmarked numbers are the prime numbers from 1 to ${N}`);
