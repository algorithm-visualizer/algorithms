logger.print('original array = [' + D.join(', ') + ']');
var N = D.length;
var writes = 0;   // number of writing performed
var pos;          // the index of item in the sorted array
var item;         // an item in the array
var temp;         // a temp value used for storing swapped item
for (var cycleStart = 0; cycleStart <= N - 2; cycleStart++) {
  item = D[cycleStart];

  // find where to put the item
  pos = cycleStart;
  tracer.select(cycleStart);

  for (var i = cycleStart + 1; i <= N - 1; i++) {
    tracer.select(i).wait().deselect(i);
    if (D[i] < item) {
      pos++;
    }
  }

  // if the item is already there, this is not a circle
  if (pos === cycleStart) {
    tracer.deselect(cycleStart);
    continue;
  }

  // otherwise put the item there or right after any duplicates
  while (item === D[pos]) {
    pos++;
  }

  // write item to new index and increment writes
  temp = D[pos];
  D[pos] = item;
  item = temp;

  writes++;

  if (pos !== cycleStart) {
    logger.print('Rewrite ' + D[pos] + ' to index ' + pos + '; the next value to rewrite is ' + item);
  } else {
    logger.print('Rewrite ' + D[pos] + ' to index ' + pos);
  }
  tracer.select(pos).wait().deselect(pos);
  tracer.notify(pos, D[pos]).notify(cycleStart, D[cycleStart]).wait();
  tracer.denotify(pos).denotify(cycleStart);

  // rotate the rest of the cycle
  while (pos !== cycleStart) {
    pos = cycleStart;

    for (i = cycleStart + 1; i <= N - 1; i++) {
      tracer.select(i).wait().deselect(i);
      if (D[i] < item) {
        pos++;
      }
    }

    while (item === D[pos]) {
      pos++;
    }

    temp = D[pos];
    D[pos] = item;
    item = temp;

    if (pos !== cycleStart) {
      logger.print('Rewrite ' + D[pos] + ' to index ' + pos + '; the next value to rewrite is ' + item);
    } else {
      logger.print('Rewrite ' + D[pos] + ' to index ' + pos);
    }
    tracer.select(pos).wait().deselect(pos);
    tracer.notify(pos, D[pos]).notify(cycleStart, D[cycleStart]).wait();
    tracer.denotify(pos).denotify(cycleStart);

    writes++;
  }
}

logger.print('Number of writes performed is ' + writes);
