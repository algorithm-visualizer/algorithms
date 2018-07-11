import { Array2DTracer, Randomize } from 'algorithm-visualizer';

const maxValue = 100;
const arraySize = 10;
const numBuckets = 5;

// initialize array values
const array = Randomize.array1D(arraySize, { min: 0, max: maxValue - 1 });
const buckets = [];
const bucketsCount = [];
const sortedArray = [];
for (let i = 0; i < arraySize; i++) {
  if (i < numBuckets) {
    buckets[i] = [];
    bucketsCount[i] = 0;
  }
  sortedArray[i] = 0;
}
const D = [
  array,
  bucketsCount,
  sortedArray,
];

const tracer = new Array2DTracer();
tracer.set(D).delay();

// place numbers into appropriate buckets
for (let i = 0; i < array.length; i++) {
  const bucketPos = Math.floor(numBuckets * (array[i] / maxValue));
  buckets[bucketPos].push(array[i]);
  bucketsCount[bucketPos]++;
  tracer.select(0, i).delay();
  tracer.patch(1, bucketPos, D[1][bucketPos]).delay();
  tracer.deselect(0, i);
  tracer.depatch(1, bucketPos, D[1][bucketPos]);
}

let sortLocation = 0;
for (let k = 0; k < buckets.length; k++) {
  // do insertion sort
  for (let i = 1; i < buckets[k].length; i++) {
    const key = buckets[k][i];
    let j;
    for (j = i - 1; (j >= 0) && (buckets[k][j] > key); j--) {
      buckets[k][j + 1] = buckets[k][j];
    }
    buckets[k][j + 1] = key;
  }

  // place ordered buckets into sorted array
  for (let i = 0; i < buckets[k].length; i++) {
    sortedArray[sortLocation] = buckets[k][i];
    bucketsCount[k]--;
    tracer.patch(1, k, D[1][k]);
    tracer.patch(2, sortLocation, D[2][sortLocation]).delay();
    tracer.depatch(1, k, D[1][k]);
    tracer.depatch(2, sortLocation, D[2][sortLocation]);
    sortLocation++;
  }
}
