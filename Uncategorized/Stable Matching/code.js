var ARank = {
'Flavio'  : [ 'Valentine', 'July', 'Summer', 'Violet' ],
'Stephen': [ 'Summer', 'July', 'Valentine', 'Violet' ],
'Albert' : [ 'July', 'Violet', 'Valentine', 'Summer' ],
'Jack' : [ 'July', 'Violet', 'Valentine', 'Summer' ]
};

var BRank = {
'July': [ 'Jack', 'Stephen', 'Albert', 'Flavio' ],
'Valentine': [ 'Flavio', 'Jack', 'Stephen', 'Albert' ],
'Violet': [ 'Jack', 'Stephen', 'Flavio', 'Albert' ],
'Summer': [ 'Stephen', 'Flavio', 'Albert', 'Jack' ],
};

var tracerA = new Array1DTracer('A');
var tracerB = new Array1DTracer('B');

var _aKeys = Object.keys(ARank);
var _bKeys = Object.keys(BRank);
tracerA.set(_aKeys);
tracerB.set(_bKeys);

var logTracer = new LogTracer ( 'Console' );

function init(rank) {
  var o = {};
  for (var k in rank) {
    o[k] = {
      key: k,
      stable: false,
      rank_keys: rank[k]
    };
  }
  return o;
}

function extractUnstable(Q) {
  for (var k in Q) {
    if (Q[k].stable === false) {
      return Q[k];
    }
  }
}

var A = init(ARank), B = init(BRank);
var a, b;

while ((a = extractUnstable(A)) != null) {

  logTracer.print('Selecting ' + a.key).wait();

  var bKey = a.rank_keys.shift();
  var b = B[bKey];
  
  logTracer.print('--> Choicing ' + b.key).wait();

  if (b.stable === false) {
  
    logTracer.print('--> ' + b.key + ' is not stable, stabilizing with ' + a.key).wait();
 
    a.stable = b;
    b.stable = a;
 
    tracerA.select(_aKeys.indexOf(a.key)).wait();
    tracerB.select(_bKeys.indexOf(b.key)).wait();

  } else {

    var rank_a_in_b = b.rank_keys.indexOf(a.key);
    var rank_prev_a_in_b = b.rank_keys.indexOf(b.stable.key);
    if (rank_a_in_b < rank_prev_a_in_b) {
   
      logTracer.print('--> ' + bKey + ' is more stable with ' + a.key + ' rather than ' + b.stable.key + ' - stabilizing again').wait();
 
      A[b.stable.key].stable = false;
      tracerA.deselect(_aKeys.indexOf(b.stable.key)).wait();
 
      a.stable = b;
      b.stable = a;

      tracerA.select(_aKeys.indexOf(a.key)).wait();
      tracerB.select(_bKeys.indexOf(b.key)).wait();
    }

  }
}