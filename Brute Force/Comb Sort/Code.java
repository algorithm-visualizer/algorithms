import org.algorithm_visualizer.*;

import java.util.Arrays;

class Main {

    private static ChartTracer chartTracer = new ChartTracer();

    private static LogTracer logTracer = new LogTracer("Console");

    private static Array1DTracer tracer = new Array1DTracer();

    private static Integer[] array = (Integer[]) new Randomize.Array1D(15, new Randomize.Integer(1, 20)).create();

    public static void main(String[] args) {
        tracer.set(array);
        tracer.chart(chartTracer);
        Layout.setRoot(new VerticalLayout(new Commander[]{chartTracer, tracer, logTracer}));
        logTracer.printf("original array = %s\n", Arrays.toString(array));

        Tracer.delay();

        int length = array.length;

        int gap = length;

        boolean swapped;

        float shrink = 1.3f;

        do {
            swapped = false;

            gap = (int) Math.floor(gap / shrink);

            if(gap < 1){
                gap = 1;
            }

            for (int i = 0; i + gap < length; i++) {
                tracer.select(i);
                tracer.select(i + gap);
                Tracer.delay();
                if (array[i] > array[i + gap]) {
                    swap(i, i + gap, array);
                    swapped = true;
                }
                tracer.deselect(i);
                tracer.deselect(i + gap);
            }

        } while (gap != 1 || swapped);


        logTracer.printf("sorted array = %s\n", Arrays.toString(array));
    }

    private static void swap(int x, int y, Integer[] array) {
        int temp = array[x];
        array[x] = array[y];
        array[y] = temp;
        tracer.patch(x, array[x]);
        tracer.patch(y, array[y]);
        Tracer.delay();
        tracer.depatch(x);
        tracer.depatch(y);
    }

}
