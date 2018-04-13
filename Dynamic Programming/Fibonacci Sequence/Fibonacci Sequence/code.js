for (var i = 2; i < index; i++) {
    D[i] = D[i - 2] + D[i - 1];
    tracer.select(i - 2, i - 1).wait();
    tracer.notify(i, D[i]).wait();
    tracer.denotify(i);
    tracer.deselect(i - 2, i - 1);
}