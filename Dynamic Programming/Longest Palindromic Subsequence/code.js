
var tracer = new Array1DTracer('Input Text');
var matrix = new Array2DTracer('Matrix');
var logger = new LogTracer();


var seq = "BBABCBCAB";
var N;
N = seq.length;


var L = new Array(N);

var i,j;
for(i=0;i<N;i++) {
  L[i]= new Array(N);
}
for(i=0;i<N;i++) {
  L[i][i]=1;
}

tracer.set(seq);
matrix.set(L);


function max(a,b) {
  if(a>b){
    return a;
  } else {
    return b;
  }
}
logger.print("LPS for any string with length = 1 is 1");
for(i=2;i<=N;i++) {
  logger.print("--------------------------------------------------");
  logger.print("Considering a sub-string of length "+i);
  logger.print("--------------------------------------------------");
  for(j=0;j<N-i+1;j++) {
    var k = j+i-1;
    tracer.select(j).wait();
    tracer.notify(k).wait();

    logger.print("Comparing "+seq[j] + " and "+seq[k]);

    if(seq[j]==seq[k] && i==2) {
      logger.print("They are equal and size of the string in the interval"+j+" to "+k+" is 2, so the Longest Palindromic Subsequence in the Given range is 2");

      matrix.notify(j,k).wait();

      L[j][k]=2;
      matrix.set(L);

      matrix.denotify(j,k).wait();

    } else if(seq[j]==seq[k]) {
      logger.print("They are equal, so the Longest Palindromic Subsequence in the Given range is 2 + the Longest Increasing Subsequence between the indices "+(j+1)+" to "+(k-1));

      matrix.notify(j,k).wait();
      matrix.select(j+1,k-1).wait();

      L[j][k] = L[j+1][k-1] + 2;
      matrix.set(L);

      matrix.denotify(j,k).wait();
      matrix.deselect(j+1,k-1).wait();

    } else {
      logger.print("They are NOT equal, so the Longest Palindromic Subsequence in the Given range is the maximum Longest Increasing Subsequence between the indices "+(j+1)+" to "+(k) + " and "+(j)+" to "+(k-1));
      matrix.notify(j,k).wait();
      matrix.select(j+1,k).wait();
      matrix.select(j,k-1).wait();

      L[j][k] = max(L[j+1][k],L[j][k-1]);
      matrix.set(L);

      matrix.denotify(j,k).wait();
      matrix.deselect(j+1,k).wait();
      matrix.deselect(j,k-1).wait();
    }
    logger.print("--------------------------------------------------");
    tracer.deselect(j).wait();
    tracer.denotify(k).wait();
  }
}
logger.print("Longest Increasing Subsequence of the given string = L[0]["+(N-1)+"]="+L[0][N-1]);
