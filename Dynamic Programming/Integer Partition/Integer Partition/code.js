function partition(A, n, p){
  if (n === 0) tracer.logTracer.print('[' + A.join(', ') + ']');
  else {
    var end = n;
    if (p !== 0 && A[p-1] < n) end = A[p-1];
    for (var i = end; i > 0; i--){
        A[p] = i;
        partition(A, n-i, p+1);
    }
  }
}

function integerPartition(n){
  //Calculate number of partitions for all numbers from 1 to n
  for (var i = 2; i <= n; i++){
    // We are allowed to use numbers from 2 to i
    for (var j = 1; j <= i; j++){
      // Number of partitions without j number + number of partitions with max j
      tracer.select(i, j).wait();
      D[i][j] = D[i][j-1] + D[i-j][Math.max(j, i-j)];
      tracer.notify(i, j, D[i][j]).wait();
      tracer.denotify(i, j);
      tracer.deselect(i, j);
    }
  }
  return D[n][n];
}

tracer.logTracer.print('Partitioning: ' + integer);
partition(A, integer, 0);
var part = integerPartition(integer);
tracer.logTracer.print(part);