var N = DP.length;
var M = DP[0].length;
function update(i, j, value) {
    DP[i][j] = value;
    dataViewer.select(i, j).wait();
    tracer.notify(i, j, DP[i][j]).wait();
    tracer.denotify(i, j);
    dataViewer.deselect(i, j);
}
for (var i = 0; i < N; i++) {
    for (var j = 0; j < M; j++) {
        if (i === 0 && j === 0) {
            update(i, j, D[i][j]);
        } else if (i === 0) {
            tracer.select(i, j - 1);
            update(i, j, DP[i][j - 1] + D[i][j]);
            tracer.deselect(i, j - 1);
        } else if (j === 0) {
            tracer.select(i - 1, j);
            update(i, j, DP[i - 1][j] + D[i][j]);
            tracer.deselect(i - 1, j);
        } else {
            tracer.select(i, j - 1).select(i - 1, j);
            update(i, j, Math.max(DP[i][j - 1], DP[i - 1][j]) + D[i][j]);
            tracer.deselect(i, j - 1).deselect(i - 1, j);
        }
    }
}
logger.print('max = ' + DP[N - 1][M - 1]);