const { Tracer, Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const chart = new ChartTracer();
const tracer = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
const D = new Randomize.Array1D(15, new Randomize.Integer(0, 50)).sorted().create();
tracer.set(D);
tracer.chart(chart);
Tracer.delay();

function BinarySearch(array, element) { // array = sorted array, element = element to be found
  let minIndex = 0;
  let maxIndex = array.length - 1;
  let testElement;

  while (minIndex <= maxIndex) {
    const middleIndex = Math.floor((minIndex + maxIndex) / 2);
    testElement = array[middleIndex];

    tracer.select(minIndex, maxIndex);
    Tracer.delay();
    tracer.patch(middleIndex);
    logger.println(`Searching at index: ${middleIndex}`);
    Tracer.delay();
    tracer.depatch(middleIndex);
    tracer.deselect(minIndex, maxIndex);

    if (testElement < element) {
      logger.println('Going right.');
      minIndex = middleIndex + 1;
    } else if (testElement > element) {
      logger.println('Going left.');
      maxIndex = middleIndex - 1;
    } else {
      logger.println(`${element} is found at position ${middleIndex}!`);
      tracer.select(middleIndex);

      return middleIndex;
    }
  }

  logger.println(`${element} is not found!`);
  return -1;
}

const element = D[new Randomize.Integer(0, D.length - 1).create()];

logger.println(`Using iterative binary search to find ${element}`);
BinarySearch(D, element);
