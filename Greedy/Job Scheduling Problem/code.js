const { Array1DTracer } = require('algorithm-visualizer');

const jobId = ['a', 'b', 'c', 'd', 'e'];
const deadline = [2, 1, 2, 1, 3];
const profit = [100, 19, 27, 25, 15];
const N = deadline.length;

const tracer3 = new Array1DTracer('Schedule');
const tracer = new Array1DTracer('Job Ids');
const tracer1 = new Array1DTracer('Deadlines');
const tracer2 = new Array1DTracer('Profit');

// sort according to decreasing order of profit
// Bubble sort implemented ... Implement a better algorithm for better performance
for (let i = 0; i < N - 1; i++) {
  for (let j = 0; j < N - i - 1; j++) {
    if (profit[j] < profit[j + 1]) {
      let temp = profit[j];
      profit[j] = profit[j + 1];
      profit[j + 1] = temp;
      temp = deadline[j];
      deadline[j] = deadline[j + 1];
      deadline[j + 1] = temp;
      const t = jobId[j];
      jobId[j] = jobId[j + 1];
      jobId[j + 1] = t;
    }
  }
}

const slot = new Array(N);
const result = new Array(N);
for (let i = N - 1; i >= 0; i--) {
  result[i] = '-';
}
tracer.set(jobId);
tracer1.set(deadline);
tracer2.set(profit);
tracer3.set(result).delay();

// Initialise all slots to free
for (let i = 0; i < N; i++) {
  slot[i] = 0;
}

// Iterate through all the given jobs
for (let i = 0; i < N; i++) {
  /*
     Start from the last possible slot.
     Find a slot for the job
     */
  tracer.select(i).delay();
  tracer1.select(i).delay();
  for (let j = Math.min(N, deadline[i]) - 1; j >= 0; j--) {
    if (slot[j] === 0) {
      tracer3.patch(j, jobId[i]).delay();
      result[j] = jobId[i];
      slot[j] = 1;
      tracer3.depatch(j);
      break;
    }
  }
  tracer.deselect(i);
  tracer1.deselect(i);
}

