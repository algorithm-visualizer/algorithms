function BinarySearch(array, element, minIndex, maxIndex) { // array = sorted array, element = element to be found, minIndex = low index, maxIndex = high index
    if (minIndex > maxIndex) {
        logger.print(element + ' is not found!');
        return -1;
    }

    var middleIndex = Math.floor((minIndex + maxIndex) / 2);
    var testElement = array[middleIndex];

    tracer.select(minIndex, maxIndex).wait();
    tracer.notify(middleIndex);
    logger.print('Searching at index: ' + middleIndex).wait();
    tracer.denotify(middleIndex);
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
        logger.print(element + ' is found at position ' + middleIndex + '!');
        tracer.select(middleIndex);
        return middleIndex;
    }

    logger.print(element + ' is not found!');
    return -1;
}

var element = D[Integer.random(0, D.length - 1)];

logger.print('Using binary search to find ' + element);
BinarySearch(D, element, 0, D.length - 1);