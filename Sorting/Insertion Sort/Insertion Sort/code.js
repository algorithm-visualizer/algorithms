logger.print('original array = [' + D.join(', ') + ']');
for (var i = 1; i < D.length; i++) {
    var key = D[i];
    logger.print('insert ' + key);
    tracer.select(i).wait();
    var j;
    for (j = i - 1; (j >= 0) && (D[j] > key); j--) {
        D[j + 1] = D[j];
        tracer.notify(j + 1, D[j + 1]).wait();
        tracer.denotify(j + 1);
    }
    D[j + 1] = key;
    tracer.notify(j + 1, D[j + 1]).wait();
    tracer.denotify(j + 1);
    tracer.deselect(i);
}
logger.print('sorted array = [' + D.join(', ') + ']');