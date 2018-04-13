var chart = new ChartTracer();
var tracer = new Array1DTracer().chart(chart);
var logger = new LogTracer();
var D = Array1D.randomSorted(15, 0, 50);
tracer.set(D);

function BinarySearch(array, element) { // array = sorted array, element = element to be found
    var minIndex = 0;
    var maxIndex = array.length - 1;
    var testElement;

    while (minIndex <= maxIndex) {

        var middleIndex = Math.floor((minIndex + maxIndex) / 2);
        testElement = array[middleIndex];

        tracer.select(minIndex, maxIndex).wait();
        tracer.notify(middleIndex);
        logger.print('Searching at index: ' + middleIndex).wait();
        tracer.denotify(middleIndex);
        tracer.deselect(minIndex, maxIndex);

        if (testElement < element) {

            logger.print('Going right.');
            minIndex = middleIndex + 1;

        } else if (testElement > element) {

            logger.print('Going left.');
            maxIndex = middleIndex - 1;

        } else {

            logger.print(element + ' is found at position ' + middleIndex + '!');
            tracer.select(middleIndex);

            return middleIndex;
        }
    }

    logger.print(element + ' is not found!');
    return -1;
}

var element = D[Integer.random(0, D.length - 1)];

logger.print('Using iterative binary search to find ' + element);
BinarySearch(D, element);
