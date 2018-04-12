logger.print('original array = [' + D.join(', ') + ']');
var N = D.length;
var swapped;
do {
    swapped = false;
    tracer.select(N - 1).wait();
    for (var i = 1; i < N; i++) {
        tracer.select(i).wait();
        if (D[i - 1] > D[i]) {
            logger.print('swap ' + D[i - 1] + ' and ' + D[i]);
            var temp = D[i - 1];
            D[i - 1] = D[i];
            D[i] = temp;
            swapped = true;
            tracer.notify(i - 1, D[i - 1]).notify(i, D[i]).wait();
            tracer.denotify(i - 1).denotify(i);
        }
        tracer.deselect(i);
    }
    tracer.deselect(N - 1);
    N--;
} while (swapped);
logger.print('sorted array = [' + D.join(', ') + ']');