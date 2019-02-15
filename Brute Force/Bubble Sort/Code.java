import org.algorithm_visualizer.*;

import java.util.Arrays;

public class Main {

    private static ChartTracer chartTracer = new ChartTracer();

    private static LogTracer logTracer = new LogTracer("Console");

    private static Integer [] array = (Integer[]) new Randomize.Array1D(15, new Randomize.Integer(1, 20)).create();

    public static void main(String[] args) {

        int length = array.length;

        logTracer.printf("original array = %s\n",Arrays.toString(array));
        chartTracer.set(array);
        Layout.setRoot(new VerticalLayout(new Commander[]{chartTracer, logTracer}));
        Tracer.delay();

        boolean flag;

        for (int i = length - 1; i > 0; i--) {
            flag = true;
            for (int j = 0; j < i; j++) {
                chartTracer.select(j);
                chartTracer.select(j + 1);
                Tracer.delay();
                if (array[j] > array[j + 1]) {
                    logTracer.printf("swap %s and %s\n",array[j],array[j + 1]);
                    swap(j, j + 1, array);
                    flag = false;
                }
                chartTracer.deselect(j);
                chartTracer.deselect(j + 1);
            }
            if (flag) {
                break;
            }
        }


        logTracer.printf("sorted array = %s\n",Arrays.toString(array));

    }

    private static void swap(int x, int y, Integer [] array) {
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
