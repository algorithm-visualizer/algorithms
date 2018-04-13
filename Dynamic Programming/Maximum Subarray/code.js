var tracer = new Array1DTracer();
var logger = new LogTracer();
var D = [-2, -3, 4, -1, -2, 1, 5, -3];
tracer.set(D);

var maxSubarraySum = (function maxSubarray(array) {
    var maxSoFar = 0,
        maxEndingHere = 0;

    logger.print('Initializing maxSoFar = 0 & maxEndingHere = 0');

    for (var i = 0; i < array.length; i++) {
        tracer.select(i);
        logger.print(maxEndingHere + ' + ' + array[i]);
        maxEndingHere += array[i];
        logger.print('=> ' + maxEndingHere);

        if (maxEndingHere < 0) {
            logger.print('maxEndingHere is negative, set to 0');
            maxEndingHere = 0;
        }

        if (maxSoFar < maxEndingHere) {
            logger.print('maxSoFar < maxEndingHere, setting maxSoFar to maxEndingHere (' + maxEndingHere + ')');
            maxSoFar = maxEndingHere;
        }

        tracer.wait();
        tracer.deselect(i);
    }

    return maxSoFar;
})(D);

logger.print('Maximum Subarray\'s Sum is: ' + maxSubarraySum);