logger.print('original array = [' + D.join(', ') + ']');

function mergeSort(start, end) {
    if (Math.abs(end - start) <= 1) return [];
    var middle = Math.ceil((start + end) / 2);

    mergeSort(start, middle);
    mergeSort(middle, end);

    logger.print('divide left[' + start + ', ' + (middle - 1) + '], right[' + (middle) + ', ' + (end - 1) + ']');
    return mergeSort.merge(start, middle, end);
}

mergeSort.merge = function (start, middle, end) {
    var leftSize = middle - start;
    var rightSize = end - middle;
    var maxSize = Math.max(leftSize, rightSize);
    var size = end - start;
    var left = [];
    var right = [];
    var i;

    for (i = 0; i < maxSize; i++) {
        if (i < leftSize) {
            left.push(D[start + i]);
            tracer.select(start + i);
            logger.print('insert value into left array[' + i + '] = ' + D[start + i]).wait();
        }
        if (i < rightSize) {
            right.push(D[middle + i]);
            tracer.select(middle + i);
            logger.print('insert value into right array[' + i + '] = ' + D[middle + i]).wait();
        }
    }
    logger.print('left array = [' + left.join(', ') + '], ' + 'right array = [' + right.join(', ') + ']');

    i = 0;
    while (i < size) {
        if (left[0] && right[0]) {
            if (left[0] > right[0]) {
                D[start + i] = right.shift();
                logger.print('rewrite from right array[' + i + '] = ' + D[start + i]);
            } else {
                D[start + i] = left.shift();
                logger.print('rewrite from left array[' + i + '] = ' + D[start + i]);
            }
        } else if (left[0]) {
            D[start + i] = left.shift();
            logger.print('rewrite from left array[' + i + '] = ' + D[start + i]);
        } else {
            D[start + i] = right.shift();
            logger.print('rewrite from right array[' + i + '] = ' + D[start + i]);
        }

        tracer.deselect(start + i);
        tracer.notify(start + i, D[start + i]).wait();
        tracer.denotify(start + i);
        i++;
    }

    var tempArray = [];
    for (i = start; i < end; i++) tempArray.push(D[i]);
    logger.print('merged array = [' + tempArray.join(', ') + ']');
};

mergeSort(0, D.length);
logger.print('sorted array = [' + D.join(', ') + ']');
