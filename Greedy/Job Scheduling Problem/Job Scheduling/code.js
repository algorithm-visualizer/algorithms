// sort according to decreasing order of profit 
// Bubble sort implemented ... Implement a better algorithm for better performance
for (var i = 0; i < N - 1; i++) {
    for (var j = 0; j < N - i - 1; j++) {
        if (profit[j] < profit[j + 1]) {
            var temp = profit[j];
            profit[j] = profit[j + 1];
            profit[j + 1] = temp;
            temp = deadline[j];
            deadline[j] = deadline[j + 1];
            deadline[j + 1] = temp;
            var t = jobId[j];
            jobId[j] = jobId[j + 1];
            jobId[j + 1] = t;
        }
    }
}

var slot = new Array(N);
var result = new Array(N);
for (var i = N - 1; i >= 0; i--) {
    result[i] = '-';
}
tracer.set(jobId);
tracer1.set(deadline);
tracer2.set(profit);
tracer3.set(result);

// Initialise all slots to free 
for (var i = 0; i < N; i++) {
    slot[i] = 0;
}

// Iterate through all the given jobs
for (var i = 0; i < N; i++) {
    /*
     Start from the last possible slot.
     Find a slot for the job
     */
    tracer.select(i).wait();
    tracer1.select(i).wait();
    for (var j = Math.min(N, deadline[i]) - 1; j >= 0; j--) {
        if (slot[j] === 0) {
            tracer3.notify(j, jobId[i]).wait();
            result[j] = jobId[i];
            slot[j] = 1;
            tracer3.denotify(j);
            break;
        }
    }
    tracer.deselect(i);
    tracer1.deselect(i);
}

