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
        quickSort(array, 0, array.length - 1);
        logTracer.printf("sorted array = %s\n", Arrays.toString(array));
    }

    public static void quickSort(Integer[] arr, int left, int right) {
        int l, r, s;
        while (right > left) {
            l = left;
            r = right;
            s = arr[left];
            while (l < r) {
                tracer.select(left);
                tracer.select(right);
                Tracer.delay();
                while (arr[r] > s) {
                    tracer.select(r);
                    Tracer.delay();
                    tracer.deselect(r);
                    r--;
                }
                arr[l] = arr[r];
                tracer.patch(l, arr[r]);
                Tracer.delay();
                tracer.depatch(l);
                while (s >= arr[l] && l < r) {
                    tracer.select(l);
                    Tracer.delay();
                    tracer.deselect(l);
                    l++;
                }
                arr[r] = arr[l];
                tracer.patch(r, arr[l]);
                Tracer.delay();
                tracer.depatch(r);
                tracer.deselect(left);
                tracer.deselect(right);
            }
            arr[l] = s;
            tracer.patch(l, s);
            Tracer.delay();
            tracer.depatch(l);
            quickSort(arr, left, l - 1);
            left = l + 1;
        }
    }

}
