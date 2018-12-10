import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(15, new Randomize.Integer(0, 50)).sorted().create();
tracer.set(D).delay();

function BinarySearch(array, element) { // array = sorted array, element = element to be found
  let minIndex = 0;
  let maxIndex = array.length - 1;
  let testElement;

  while (minIndex <= maxIndex) {
    const middleIndex = Math.floor((minIndex + maxIndex) / 2);
    testElement = array[middleIndex];

    tracer.select(minIndex, maxIndex).delay();
    tracer.patch(middleIndex);
    logger.print(`Searching at index: ${middleIndex}`).delay();
    tracer.depatch(middleIndex);
    tracer.deselect(minIndex, maxIndex);

    if (testElement < element) {
      logger.print('Going right.');
      minIndex = middleIndex + 1;
    } else if (testElement > element) {
      logger.print('Going left.');
      maxIndex = middleIndex - 1;
    } else {
      logger.print(`${element} is found at position ${middleIndex}!`);
      tracer.select(middleIndex);

      return middleIndex;
    }
  }

  logger.print(`${element} is not found!`);
  return -1;
}

const element = D[new Randomize.Integer(0, D.length - 1).create()];

logger.print(`Using iterative binary search to find ${element}`);
BinarySearch(D, element);
