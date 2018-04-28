const ARank = {
  Flavio: ['Valentine', 'July', 'Summer', 'Violet'],
  Stephen: ['Summer', 'July', 'Valentine', 'Violet'],
  Albert: ['July', 'Violet', 'Valentine', 'Summer'],
  Jack: ['July', 'Violet', 'Valentine', 'Summer'],
};

const BRank = {
  July: ['Jack', 'Stephen', 'Albert', 'Flavio'],
  Valentine: ['Flavio', 'Jack', 'Stephen', 'Albert'],
  Violet: ['Jack', 'Stephen', 'Flavio', 'Albert'],
  Summer: ['Stephen', 'Flavio', 'Albert', 'Jack'],
};

const tracerA = new Array1DTracer('A');
const tracerB = new Array1DTracer('B');

const _aKeys = Object.keys(ARank);
const _bKeys = Object.keys(BRank);
tracerA.set(_aKeys);
tracerB.set(_bKeys);

const logTracer = new LogTracer('Console');

function init(rank) {
  const o = {};
  for (const k in rank) {
    o[k] = {
      key: k,
      stable: false,
      rank_keys: rank[k],
    };
  }
  return o;
}

function extractUnstable(Q) {
  for (const k in Q) {
    if (Q[k].stable === false) {
      return Q[k];
    }
  }
}

let A = init(ARank),
  B = init(BRank);
var a,
  b;

while ((a = extractUnstable(A)) != null) {
  logTracer.print(`Selecting ${a.key}`).wait();

  const bKey = a.rank_keys.shift();
  var b = B[bKey];

  logTracer.print(`--> Choicing ${b.key}`).wait();

  if (b.stable === false) {
    logTracer.print(`--> ${b.key} is not stable, stabilizing with ${a.key}`).wait();

    a.stable = b;
    b.stable = a;

    tracerA.select(_aKeys.indexOf(a.key)).wait();
    tracerB.select(_bKeys.indexOf(b.key)).wait();
  } else {
    const rank_a_in_b = b.rank_keys.indexOf(a.key);
    const rank_prev_a_in_b = b.rank_keys.indexOf(b.stable.key);
    if (rank_a_in_b < rank_prev_a_in_b) {
      logTracer.print(`--> ${bKey} is more stable with ${a.key} rather than ${b.stable.key} - stabilizing again`).wait();

      A[b.stable.key].stable = false;
      tracerA.deselect(_aKeys.indexOf(b.stable.key)).wait();

      a.stable = b;
      b.stable = a;

      tracerA.select(_aKeys.indexOf(a.key)).wait();
      tracerB.select(_bKeys.indexOf(b.key)).wait();
    }
  }
}
