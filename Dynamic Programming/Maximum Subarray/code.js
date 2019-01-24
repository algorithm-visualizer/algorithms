import { Array1DTracer, LogTracer } from 'algorithm-visualizer';

const tracer = new Array1DTracer();
const logger = new LogTracer();
const D = [-2, -3, 4, -1, -2, 1, 5, -3];
tracer.set(D).delay();

const maxSubarraySum = (function maxSubarray(array) {
  let maxSoFar = 0;
  let maxEndingHere = 0;

  logger.println('Initializing maxSoFar = 0 & maxEndingHere = 0');

  for (let i = 0; i < array.length; i++) {
    tracer.select(i);
    logger.println(`${maxEndingHere} + ${array[i]}`);
    maxEndingHere += array[i];
    logger.println(`=> ${maxEndingHere}`);

    if (maxEndingHere < 0) {
      logger.println('maxEndingHere is negative, set to 0');
      maxEndingHere = 0;
    }

    if (maxSoFar < maxEndingHere) {
      logger.println(`maxSoFar < maxEndingHere, setting maxSoFar to maxEndingHere (${maxEndingHere})`);
      maxSoFar = maxEndingHere;
    }

    tracer.delay();
    tracer.deselect(i);
  }

  return maxSoFar;
}(D));

logger.println(`Maximum Subarray's Sum is: ${maxSubarraySum}`);
