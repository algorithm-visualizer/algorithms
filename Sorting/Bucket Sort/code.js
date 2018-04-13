var maxValue = 100;
var arraySize = 10;
var numBuckets = 5;

//initialize array values
var array = Array1D.random(arraySize, 0, maxValue - 1);
var buckets = [];
var bucketsCount = [];
var sortedArray = [];
for (let i = 0; i < arraySize; i++) {
    if (i < numBuckets) {
		buckets[i] = [];
		bucketsCount[i] = 0;
	}
    sortedArray[i] = 0;
}	
var D = [
    array,
    bucketsCount,
    sortedArray
];

var tracer = new Array2DTracer();
tracer.set(D);


//place numbers into appropriate buckets
for (let i = 0; i < array.length; i++) {
	var bucketPos = Math.floor(numBuckets * (array[i] / maxValue));
	buckets[bucketPos].push(array[i]);
	bucketsCount[bucketPos]++;
	tracer.select(0, i).wait();
	tracer.notify(1, bucketPos, D[1][bucketPos]).wait();
	tracer.deselect(0, i);
	tracer.denotify(1, bucketPos, D[1][bucketPos]);
}

var sortLocation = 0;
for (let k = 0; k < buckets.length; k++) {
	//do insertion sort
	for (let i = 1; i < buckets[k].length; i++) {
		var key = buckets[k][i];
		var j;
		for (j = i - 1; (j >= 0) && (buckets[k][j] > key); j--) {
			buckets[k][j + 1] = buckets[k][j];
		}
		buckets[k][j + 1] = key;
	}
	
	//place ordered buckets into sorted array
	for (let i = 0; i < buckets[k].length; i++) {
		sortedArray[sortLocation] = buckets[k][i];
		bucketsCount[k]--;
		tracer.notify(1, k, D[1][k]);
        tracer.notify(2, sortLocation, D[2][sortLocation]).wait();
		tracer.denotify(1, k, D[1][k]);
        tracer.denotify(2, sortLocation, D[2][sortLocation]);
		sortLocation++;
	}
}