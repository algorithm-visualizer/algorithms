const { Array1DTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new Array1DTracer('Sequence');
Layout.setRoot(new VerticalLayout([tracer]));
const index = 15;
const D = [1, 1];
for (let i = 2; i < index; i++) {
  D.push(0);
}
tracer.set(D);
tracer.delay();

for (let i = 2; i < index; i++) {
  D[i] = D[i - 2] + D[i - 1];
  tracer.select(i - 2, i - 1);
  tracer.delay();
  tracer.patch(i, D[i]);
  tracer.delay();
  tracer.depatch(i);
  tracer.deselect(i - 2, i - 1);
}
