import { Array1DTracer, LogTracer } from 'algorithm-visualizer';

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

const logTracer = new LogTracer('Console').delay();

function init(rank) {
  const o = {};
  for (const k in rank) {
    o[k] = {
      key: k,
      stable: false,
      rankKeys: rank[k],
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

const A = init(ARank);
const B = init(BRank);
let a;

while ((a = extractUnstable(A))) {
  logTracer.print(`Selecting ${a.key}`).delay();

  const bKey = a.rankKeys.shift();
  const b = B[bKey];

  logTracer.print(`--> Choicing ${b.key}`).delay();

  if (b.stable === false) {
    logTracer.print(`--> ${b.key} is not stable, stabilizing with ${a.key}`).delay();

    a.stable = b;
    b.stable = a;

    tracerA.select(_aKeys.indexOf(a.key)).delay();
    tracerB.select(_bKeys.indexOf(b.key)).delay();
  } else {
    const rankAinB = b.rankKeys.indexOf(a.key);
    const rankPrevAinB = b.rankKeys.indexOf(b.stable.key);
    if (rankAinB < rankPrevAinB) {
      logTracer.print(`--> ${bKey} is more stable with ${a.key} rather than ${b.stable.key} - stabilizing again`).delay();

      A[b.stable.key].stable = false;
      tracerA.deselect(_aKeys.indexOf(b.stable.key)).delay();

      a.stable = b;
      b.stable = a;

      tracerA.select(_aKeys.indexOf(a.key)).delay();
      tracerB.select(_bKeys.indexOf(b.key)).delay();
    }
  }
}
