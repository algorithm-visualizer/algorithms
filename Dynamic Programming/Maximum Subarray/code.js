import { Array1DTracer, LogTracer } from 'algorithm-visualizer';

const tracer = new Array1DTracer();
const logger = new LogTracer();
const D = [-2, -3, 4, -1, -2, 1, 5, -3];
tracer.set(D).delay();

const maxSubarraySum = (function maxSubarray(array) {
  let maxSoFar = 0;
  let maxEndingHere = 0;

  logger.print('Initializing maxSoFar = 0 & maxEndingHere = 0');

  for (let i = 0; i < array.length; i++) {
    tracer.select(i);
    logger.print(`${maxEndingHere} + ${array[i]}`);
    maxEndingHere += array[i];
    logger.print(`=> ${maxEndingHere}`);

    if (maxEndingHere < 0) {
      logger.print('maxEndingHere is negative, set to 0');
      maxEndingHere = 0;
    }

    if (maxSoFar < maxEndingHere) {
      logger.print(`maxSoFar < maxEndingHere, setting maxSoFar to maxEndingHere (${maxEndingHere})`);
      maxSoFar = maxEndingHere;
    }

    tracer.delay();
    tracer.deselect(i);
  }

  return maxSoFar;
}(D));

logger.print(`Maximum Subarray's Sum is: ${maxSubarraySum}`);
