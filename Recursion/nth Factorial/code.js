import { Array1DTracer } from 'algorithm-visualizer';

var tracer = new Array1DTracer('Sequence');
var index = 15;
var D = [1];
for (var i = 1; i < index; i++) {
    D.push(0);
}
tracer._setData(D);

function fact(num) {
  if (num < 0) {
    return;
  }

  if (num === 0) {
    return 1;
  }

  var res = num * fact(num - 1);

  D[num - 1] = res;
  
  tracer._select(num - 1)._wait();
  tracer._notify(num - 1, D[num - 1])._wait();
  tracer._denotify(num - 1);
  tracer._deselect(num - 1);

  return res;
}
fact(index);
