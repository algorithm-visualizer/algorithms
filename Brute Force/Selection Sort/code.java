import org.algorithm_visualizer.*;

import java.util.Arrays;

public class Main {

    private static ChartTracer chartTracer = new ChartTracer();

    private static LogTracer logTracer = new LogTracer("Console");

    private static Integer [] array = (Integer[]) new Randomize.Array1D(15, new Randomize.Integer(1, 20)).create();

    public static void main(String[] args) {
        int length = array.length;
        Layout.setRoot(new VerticalLayout(new Commander[]{chartTracer, logTracer}));
        logTracer.printf("original array = %s\n", Arrays.toString(array));
        chartTracer.set(array);
        Tracer.delay();
        int minIndex;

        for (int i = 0; i < length; i++) {
            chartTracer.select(i);
            Tracer.delay();
            minIndex = i;
            for (int j = i + 1; j < length; j++){
                chartTracer.select(j);
                Tracer.delay();
                if(array[j] < array[minIndex]) {
                    chartTracer.patch(j, array[j]);
                    Tracer.delay();
                    chartTracer.depatch(j);
                    minIndex = j;
                }
                chartTracer.deselect(j);
            }
            swap(minIndex, i, array);
            chartTracer.deselect(i);
        }

        logTracer.printf("sorted array = %s\n", Arrays.toString(array));
    }


    private static void swap(int x, int y, Integer[] array) {
        int temp = array[x];
        array[x] = array[y];
        array[y] = temp;
        chartTracer.patch(x, array[x]);
        chartTracer.patch(y, array[y]);
        Tracer.delay();
        chartTracer.depatch(x);
        chartTracer.depatch(y);
    }

}
