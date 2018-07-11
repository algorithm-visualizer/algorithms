import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = Randomize.array1D(15, { sorted: true, min: 0, max: 50 });
tracer.set(D).delay();

function BinarySearch(array, element, minIndex, maxIndex) { // array = sorted array, element = element to be found, minIndex = low index, maxIndex = high index
  if (minIndex > maxIndex) {
    logger.print(`${element} is not found!`);
    return -1;
  }

  const middleIndex = Math.floor((minIndex + maxIndex) / 2);
  const testElement = array[middleIndex];

  tracer.select(minIndex, maxIndex).delay();
  tracer.patch(middleIndex);
  logger.print(`Searching at index: ${middleIndex}`).delay();
  tracer.depatch(middleIndex);
  tracer.deselect(minIndex, maxIndex);

  if (testElement < element) {
    logger.print('Going right.');
    return BinarySearch(array, element, middleIndex + 1, maxIndex);
  }

  if (testElement > element) {
    logger.print('Going left.');
    return BinarySearch(array, element, minIndex, middleIndex - 1);
  }

  if (testElement === element) {
    logger.print(`${element} is found at position ${middleIndex}!`);
    tracer.select(middleIndex);
    return middleIndex;
  }

  logger.print(`${element} is not found!`);
  return -1;
}

const element = D[Randomize.integer(0, D.length - 1)];

logger.print(`Using binary search to find ${element}`);
BinarySearch(D, element, 0, D.length - 1);
