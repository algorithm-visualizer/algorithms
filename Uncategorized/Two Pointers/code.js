const { Tracer, Array1DTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new Array1DTracer('Input array');
const areaTracer = new Array1DTracer('Max area calculation');
const logger = new LogTracer();

Layout.setRoot(new VerticalLayout([tracer, areaTracer, logger]));

function maxArea(height) {
    tracer.set(height)

    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        tracer.select(left);
        tracer.select(right);
        Tracer.delay();
        logger.println(`Checking area between ${left} and ${right}`);

        const h = Math.min(height[left], height[right]);
        areaTracer.patch(0, h)
        Tracer.delay();

        const w = right - left;
        areaTracer.patch(1, h)
        Tracer.delay();

        const area = h * w;
        maxArea = Math.max(maxArea, area);

        areaTracer.patch(2, maxArea)
        Tracer.delay();

        tracer.deselect(left, right)
        Tracer.delay();

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}

const height1 = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(height1)); // Output: 49