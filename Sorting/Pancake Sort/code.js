var chart = new ChartTracer();
var tracer = new Array1DTracer().chart(chart);
var logger = new LogTracer();
var D = Array1D.random(10);
tracer.set(D);


logger.print('original array = [' + D.join(', ') + ']');
var N = D.length;
function flip (start) {
  tracer.select(start, N).wait();
  var idx = 0;
  for (var i=start;i<(start+N)/2;i++) {
    tracer.select(i).wait();
    var temp = D[i];
    D[i] = D[N-idx-1];
    D[N-idx-1] = temp;
    idx++;
    tracer.notify(i, D[i]).notify(N-idx, D[N-idx]).wait();
    tracer.denotify(i).denotify(N-idx);
    tracer.deselect(i);
  }
  tracer.deselect(start, N);
}
for (var i=0;i<N-1;i++) {
  logger.print('round ' + (i+1));
  var currArr = D.slice(i, N);
  var currMax = currArr.reduce((prev, curr, idx) => {
    return (curr > prev.val) ? { idx: idx, val: curr} : prev;
  }, {idx: 0, val: currArr[0]});
  if (currMax.idx !== 0) { // if currMax.idx === 0 that means max element already at the bottom, no flip required
    logger.print('flip at ' + (currMax.idx+i) + ' (step 1)');
    flip(currMax.idx+i, N);
    logger.print('flip at ' + (i) + ' (step 2)');
    flip(i, N);
  }
}
logger.print('sorted array = [' + D.join(', ') + ']');
