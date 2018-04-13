logger.print('original array = [' + D[0].join(', ') + ']');
function pow(base, expo) {
    var ans = 1;
    for (var i = 0; i < expo; i++) {
        ans *= base;
    }
    return ans;
}
function digit(i, exp) {
    return parseInt(D[0][i] / pow(10, exp) % 10);
}
for (var exp = 0; exp < 3; exp++) {
    logger.print("Digit: " + exp);
    var i;
    for (i = 0; i < D[0].length; i++) {
        var d = digit(i, exp);
        tracer.select(0, i).wait();
        D[2][d] += 1;
        tracer.notify(2, d, D[2][d]).wait();
        tracer.denotify(2, d);
        tracer.deselect(0, i);
    }
    for (i = 1; i < 10; i++) {
        tracer.select(2, i - 1).wait();
        D[2][i] += D[2][i - 1];
        tracer.notify(2, i, D[2][i]).wait();
        tracer.denotify(2, i);
        tracer.deselect(2, i - 1);
    }
    for (i = D[0].length - 1; i >= 0; i--) {
        var d = digit(i, exp);
        tracer.select(0, i).wait();
        D[2][d] -= 1;
        tracer.notify(2, d, D[2][d]).wait();
        tracer.denotify(2, d);
        D[1][D[2][d]] = D[0][i];
        tracer.notify(1, D[2][d], D[1][D[2][d]]).wait();
        tracer.denotify(1, D[2][d]);
        tracer.deselect(0, i);
    }
    for (i = 0; i < D[0].length; i++) {
        tracer.select(1, i).wait();
        D[0][i] = D[1][i];
        tracer.notify(0, i, D[0][i]).wait();
        tracer.denotify(0, i);
        tracer.deselect(1, i);
    }
    for (i = 0; i < 10; i++) {
        D[2][i] = 0;
        tracer.notify(2, i, D[2][i]).wait();
        tracer.denotify(2, i);
    }
}
logger.print('sorted array = [' + D[0].join(', ') + ']');
