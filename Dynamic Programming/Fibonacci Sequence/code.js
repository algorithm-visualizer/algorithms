import { Array1DTracer } from 'algorithm-visualizer';

const tracer = new Array1DTracer('Sequence');
const index = 15;
const D = [1, 1];
for (let i = 2; i < index; i++) {
  D.push(0);
}
tracer.set(D).delay();

for (let i = 2; i < index; i++) {
  D[i] = D[i - 2] + D[i - 1];
  tracer.select(i - 2, i - 1).delay();
  tracer.patch(i, D[i]).delay();
  tracer.depatch(i);
  tracer.deselect(i - 2, i - 1);
}
