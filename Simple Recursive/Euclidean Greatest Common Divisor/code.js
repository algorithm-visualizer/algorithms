import { Array1DTracer, LogTracer } from 'algorithm-visualizer';

const tracer = new Array1DTracer('Euclidean Algorithm');
const a = [];
a.push(465);
a.push(255);
tracer.set(a);
const logger = new LogTracer().delay();

logger.print(`Finding the greatest common divisor of ${a[0]} and ${a[1]}`);

logger.print('Checking if first number is at most the second number');

if (a[0] > a[1]) {
  const tmp = a[0];
  a[0] = a[1];
  a[1] = tmp;
  logger.print('The first number is bigger than the second number. Switching the numbers.');
  tracer.set(a).delay();
}

while (a[0] > 0) {
  logger.print(`${a[1]} % ${a[0]} = ${a[1] % a[0]}`);
  logger.print('Switching a[1] with a[1]%a[0]');
  a[1] %= a[0];
  tracer.patch(1, a[1]).delay();
  logger.print('Now switching the two values to keep a[0] < a[1]');
  const tmp = a[0];
  a[0] = a[1];
  a[1] = tmp;
  tracer.patch(0, a[0]);
  tracer.patch(1, a[1]).delay();
  tracer.depatch(0);
  tracer.depatch(1);
}

logger.print(`The greatest common divisor is ${a[1]}`);
