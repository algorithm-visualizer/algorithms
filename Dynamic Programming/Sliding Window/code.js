var tracer = new Array1DTracer();
var logger = new LogTracer();
var D = Randomize.array1D(20, { min: -5, max: 5 });
tracer.set(D);

var sum = D[0] + D[1] + D[2];
var max = sum;
tracer.select(0, 2);
logger.print('sum = ' + sum).wait();
for (var i = 3; i < D.length; i++) {
    sum += D[i] - D[i - 3];
    if (max < sum) max = sum;
    tracer.deselect(i - 3);
    tracer.select(i);
    logger.print('sum = ' + sum).wait();
}
tracer.deselect(D.length - 3, D.length - 1);
logger.print('max = ' + max);