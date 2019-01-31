import org.algorithm_visualizer.ChartTracer;
import org.algorithm_visualizer.LogTracer;
import org.algorithm_visualizer.Randomize;

import java.util.Arrays;

public class Code {

    private static ChartTracer chartTracer = new ChartTracer();

    private static LogTracer logTracer = new LogTracer("Console");

    private static Integer [] array = (Integer[]) new Randomize.Array1D(15, new Randomize.Integer(1, 20)).create();

    public static void main(String[] args) {

        int length = array.length;

        logTracer.printf("original array = %s\n",Arrays.toString(array));

        chartTracer.set(array).delay();

        boolean flag;

        for (int i = length - 1; i > 0; i--) {
            flag = true;
            for (int j = 0; j < i; j++) {
                chartTracer.select(j).delay();
                chartTracer.select(j + 1).delay();
                if (array[j] > array[j + 1]) {
                    logTracer.printf("swap %s and %s \t",array[j],array[j + 1]);
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


        logTracer.printf("\n sorted array = %s",Arrays.toString(array));

    }

    private static void swap(int x, int y, Integer [] array) {
        int temp = array[x];
        array[x] = array[y];
        array[y] = temp;
        chartTracer.patch(x, array[x]).patch(y, array[y]).delay();
        chartTracer.depatch(x).depatch(y);
    }

}
