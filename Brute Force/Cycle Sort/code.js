import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(15).create();
tracer.set(D).delay();

logger.print(`original array = [${D.join(', ')}]`);
const N = D.length;
let writes = 0; // number of writing performed
let pos; // the index of item in the sorted array
let item; // an item in the array
let temp; // a temp value used for storing swapped item
for (let cycleStart = 0; cycleStart <= N - 2; cycleStart++) {
  item = D[cycleStart];

  // find where to put the item
  pos = cycleStart;
  tracer.select(cycleStart);

  for (let i = cycleStart + 1; i <= N - 1; i++) {
    tracer.select(i).delay().deselect(i);
    if (D[i] < item) {
      pos++;
    }
  }

  // if the item is already there, this is not a circle
  if (pos === cycleStart) {
    tracer.deselect(cycleStart);
    continue;
  }

  // otherwise put the item there or right after any duplicates
  while (item === D[pos]) {
    pos++;
  }

  // write item to new index and increment writes
  temp = D[pos];
  D[pos] = item;
  item = temp;

  writes++;

  if (pos !== cycleStart) {
    logger.print(`Rewrite ${D[pos]} to index ${pos}; the next value to rewrite is ${item}`);
  } else {
    logger.print(`Rewrite ${D[pos]} to index ${pos}`);
  }
  tracer.select(pos).delay().deselect(pos);
  tracer.patch(pos, D[pos]).patch(cycleStart, D[cycleStart]).delay();
  tracer.depatch(pos).depatch(cycleStart);

  // rotate the rest of the cycle
  while (pos !== cycleStart) {
    pos = cycleStart;

    for (let i = cycleStart + 1; i <= N - 1; i++) {
      tracer.select(i).delay().deselect(i);
      if (D[i] < item) {
        pos++;
      }
    }

    while (item === D[pos]) {
      pos++;
    }

    temp = D[pos];
    D[pos] = item;
    item = temp;

    if (pos !== cycleStart) {
      logger.print(`Rewrite ${D[pos]} to index ${pos}; the next value to rewrite is ${item}`);
    } else {
      logger.print(`Rewrite ${D[pos]} to index ${pos}`);
    }
    tracer.select(pos).delay().deselect(pos);
    tracer.patch(pos, D[pos]).patch(cycleStart, D[cycleStart]).delay();
    tracer.depatch(pos).depatch(cycleStart);

    writes++;
  }
}

logger.print(`Number of writes performed is ${writes}`);
