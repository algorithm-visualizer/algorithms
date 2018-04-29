import { Array2DTracer, LogTracer, Randomize, Tracer } from 'algorithm-visualizer';

const tracer = new Array2DTracer();
const logger = new LogTracer();
const D = [
  Randomize.array1D(20, { min: 0, max: 50 }),
  Randomize.array1D(20, { min: 0, max: 0 }),
];

tracer.set(D);

logger.print(`original array = [${D[0].join(', ')}]`);

function mergeSort(start, end) {
  if (Math.abs(end - start) <= 1) return;

  let mergeFrom = 0,
    mergeTo = 1,
    width,
    i;
  for (width = 1; width < end; width *= 2) {
    /**/logger.print(`merging arrays of width: ${width}`);
    for (i = 0; i < end; i += 2 * width) {
      merge(mergeFrom, i, Math.min(i + width, end), Math.min(i + 2 * width, end), mergeTo);
    }
    // this could be copy(mergeTo, mergeFrom, start, end);
    // but it is more effecient to swap the input arrays
    // if you did copy here, you wouldn't need the copy at the end
    mergeFrom = (mergeFrom === 0 ? 1 : 0);
    mergeTo = 1 - mergeFrom;
  }
  if (mergeFrom !== 0) {
    /**/logger.print('final copy to original');
    copy(mergeFrom, mergeTo, start, end);
  }
}

function merge(mergeFrom, start, middle, end, mergeTo) {
  let i = start,
    j = middle,
    k;
  // in an actual merge implementation, mergeFrom and mergeTo would be arrays
  // here for the ability to trace what is going on better, the arrays are D[mergeFrom] and D[mergeTo]
  /**/logger.print(`merging segments [${start}..${middle}] and [${middle}..${end}]`);
  /**/tracer.selectRow(mergeFrom, start, end - 1).wait();
  /**/tracer.deselectRow(mergeFrom, start, end - 1);

  for (k = start; k < end; k++) {
    /**/if (j < end) {
      /**/ tracer.select(mergeFrom, j);
      /**/ }
    /**/if (i < middle) {
      /**/ tracer.select(mergeFrom, i);
      /**/ }
    /**/if (i < middle && j < end) {
      /**/ logger.print(`compare index ${i} and ${j}, values: ${D[mergeFrom][i]} and ${D[mergeFrom][j]}`).wait();
      /**/ }

    if (i < middle && (j >= end || D[mergeFrom][i] <= D[mergeFrom][j])) {
      /**/if (j < end) {
        /**/ logger.print('writing smaller value to output');
        /**/ } else {
        /**/ logger.print(`copying index ${i} to output`);
        /**/ }
      /**/tracer.notify(mergeTo, k, D[mergeFrom][i]).wait();
      /**/tracer.denotify(mergeTo, k);
      /**/tracer.deselect(mergeFrom, i);

      D[mergeTo][k] = D[mergeFrom][i];
      i += 1;
    } else {
      /**/if (i < middle) {
        /**/ logger.print('writing smaller value to output');
        /**/ } else {
        /**/ logger.print(`copying index ${j} to output`);
        /**/ }
      /**/tracer.notify(mergeTo, k, D[mergeFrom][j]).wait();
      /**/tracer.denotify(mergeTo, k);
      /**/tracer.deselect(mergeFrom, j);

      D[mergeTo][k] = D[mergeFrom][j];
      j += 1;
    }
  }
}

function copy(mergeFrom, mergeTo, start, end) {
  let i;
  for (i = start; i < end; i++) {
    /**/tracer.select(mergeFrom, i);
    /**/tracer.notify(mergeTo, i, D[mergeFrom][i]).wait();

    D[mergeTo][i] = D[mergeFrom][i];

    /**/tracer.deselect(mergeFrom, i);
    /**/tracer.denotify(mergeTo, i);
  }
}

mergeSort(0, D[0].length);
logger.print(`sorted array = [${D[0].join(', ')}]`);
