const { Tracer, Array1DTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new Array1DTracer('Euclidean Algorithm');
const a = [];
a.push(465);
a.push(255);
tracer.set(a);
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
Tracer.delay();

logger.println(`Finding the greatest common divisor of ${a[0]} and ${a[1]}`);

logger.println('Checking if first number is at most the second number');

if (a[0] > a[1]) {
  const tmp = a[0];
  a[0] = a[1];
  a[1] = tmp;
  logger.println('The first number is bigger than the second number. Switching the numbers.');
  tracer.set(a);
  Tracer.delay();
}

while (a[0] > 0) {
  logger.println(`${a[1]} % ${a[0]} = ${a[1] % a[0]}`);
  logger.println('Switching a[1] with a[1]%a[0]');
  a[1] %= a[0];
  tracer.patch(1, a[1]);
  Tracer.delay();
  logger.println('Now switching the two values to keep a[0] < a[1]');
  const tmp = a[0];
  a[0] = a[1];
  a[1] = tmp;
  tracer.patch(0, a[0]);
  tracer.patch(1, a[1]);
  Tracer.delay();
  tracer.depatch(0);
  tracer.depatch(1);
}

logger.println(`The greatest common divisor is ${a[1]}`);
