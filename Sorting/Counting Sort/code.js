var maxValue = 9;
var arrSize = 10;

//initialize array values
var A = Array1D.random(arrSize, 0, maxValue);
var counts = [];
var sortedA = [];
for (let i = 0; i <= maxValue; i++) {
    counts[i] = 0;
    if (i < arrSize) sortedA[i] = 0;
}
var D = [
    A,
    counts,
    sortedA
];

var tracer = new Array2DTracer();
tracer.set(D);


//set counts values
for (let i = 0; i < A.length; i++) {
    tracer.select(0, i).wait();
    counts[A[i]]++;
    tracer.notify(1, A[i], D[1][A[i]]).wait();
    tracer.deselect(0, i);
    tracer.denotify(1, A[i], D[1][A[i]]).wait();
}

//sort
var i = 0;
for (var j = 0; j <= maxValue; j++) {
    while (counts[j] > 0) {
        tracer.select(1, j).wait();
        sortedA[i] = j;
        counts[j]--;
        tracer.notify(1, j, D[1][j]);
        tracer.notify(2, i, D[2][i]).wait();
        tracer.deselect(1, j);
        tracer.denotify(1, j, D[1][j]);
        tracer.denotify(2, i, D[2][i]).wait();
        i++;
    }
}