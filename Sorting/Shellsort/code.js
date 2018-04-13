var chart = new ChartTracer();
var tracer = new Array1DTracer().chart(chart);
var logger = new LogTracer();
var D = Array1D.random(15);
tracer.set(D);


logger.print('Original array = [' + D.join(', ') + ']');
var N = D.length;

for (var gap = N; gap = parseInt(gap / 2);) {
    logger.print('');
    logger.print('Gap of ' + gap);
    for (var i = gap; i < N; i++) {
        tracer.select(i).select(i - gap).wait();
        var k = D[i];
        logger.print('Holding: ' + k)
        for (var j = i; j >= gap && k < D[j - gap]; j -= gap) {
            logger.print(k + ' < ' + D[j - gap]);
            D[j] = D[j - gap];
            tracer.notify(j, D[j]).wait();
            tracer.denotify(j);
        }
        var old = D[j];
        D[j] = k;
        if (old != k) {
            tracer.notify(j,D[j]).wait();
            tracer.denotify(j);
            logger.print('Swapped ' + D[j] + ' with ' + old);
        }

        tracer.deselect(i).deselect(i - gap);
    }
}
tracer.clear();
logger.print('')
logger.print('Sorted array = [' + D.join(', ') + ']');
