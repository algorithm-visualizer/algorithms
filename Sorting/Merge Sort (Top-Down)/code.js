import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = Randomize.array1D(15);
tracer.set(D).delay();

logger.print(`original array = [${D.join(', ')}]`);

function mergeSort(start, end) {
  if (Math.abs(end - start) <= 1) return [];
  const middle = Math.ceil((start + end) / 2);

  mergeSort(start, middle);
  mergeSort(middle, end);

  logger.print(`divide left[${start}, ${middle - 1}], right[${middle}, ${end - 1}]`);
  return mergeSort.merge(start, middle, end);
}

mergeSort.merge = (start, middle, end) => {
  const leftSize = middle - start;
  const rightSize = end - middle;
  const maxSize = Math.max(leftSize, rightSize);
  const size = end - start;
  const left = [];
  const right = [];
  let i;

  for (i = 0; i < maxSize; i++) {
    if (i < leftSize) {
      left.push(D[start + i]);
      tracer.select(start + i);
      logger.print(`insert value into left array[${i}] = ${D[start + i]}`).delay();
    }
    if (i < rightSize) {
      right.push(D[middle + i]);
      tracer.select(middle + i);
      logger.print(`insert value into right array[${i}] = ${D[middle + i]}`).delay();
    }
  }
  logger.print(`left array = [${left.join(', ')}], ` + `right array = [${right.join(', ')}]`);

  i = 0;
  while (i < size) {
    if (left[0] && right[0]) {
      if (left[0] > right[0]) {
        D[start + i] = right.shift();
        logger.print(`rewrite from right array[${i}] = ${D[start + i]}`);
      } else {
        D[start + i] = left.shift();
        logger.print(`rewrite from left array[${i}] = ${D[start + i]}`);
      }
    } else if (left[0]) {
      D[start + i] = left.shift();
      logger.print(`rewrite from left array[${i}] = ${D[start + i]}`);
    } else {
      D[start + i] = right.shift();
      logger.print(`rewrite from right array[${i}] = ${D[start + i]}`);
    }

    tracer.deselect(start + i);
    tracer.patch(start + i, D[start + i]).delay();
    tracer.depatch(start + i);
    i++;
  }

  const tempArray = [];
  for (i = start; i < end; i++) tempArray.push(D[i]);
  logger.print(`merged array = [${tempArray.join(', ')}]`);
};

mergeSort(0, D.length);
logger.print(`sorted array = [${D.join(', ')}]`);
