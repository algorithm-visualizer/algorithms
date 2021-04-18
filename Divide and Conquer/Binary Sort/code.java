import org.algorithm_visualizer.*;
import java.util.Arrays;

public class Main {
    private static ChartTracer chartTracer = new ChartTracer("Chart");
    private static LogTracer logTracer = new LogTracer("Console");
    private static Integer [] data = (Integer[]) new Randomize.Array1D(15, new Randomize.Integer(1, 20)).create();
    
    public static void main(String[] args) {
        int length = data.length, bitNo = 6,lowerBound = 0;
        int upperBound = length - 1;
        
        logTracer.printf("original data = %s\n",Arrays.toString(data));
        chartTracer.set(data);
        Layout.setRoot(new VerticalLayout(new Commander[]{chartTracer, logTracer}));
        Tracer.delay();

        // binaryOfAllNumbers();
        
        binarySort(data, bitNo-1, lowerBound, upperBound);

        logTracer.printf("sorted data = %s\n",Arrays.toString(data));
    }
    
    private static void binarySort(Integer [] data, int bitNo, int lowerBound, int upperBound) {
        logTracer.reset();
        logTracer.printf("scanning bitNo:%s for (%s, %s)\n", bitNo, lowerBound, upperBound);
        chartTracer.set(data);
        chartTracer.select(lowerBound, upperBound);
        Tracer.delay();
        
        int l_backup = lowerBound, u_backup = upperBound, i;
        boolean letsGo = false;

        do{
            //Scaning all the numbers between location "lowerBound" to "upperBound"
            for (i = l_backup; i <= upperBound; i++) {
                int temp = (data[i] >> bitNo) & 1;
                boolean condition;
                if(temp >= 1){
                    condition = true;
                }
                else{
                    condition = false;
                }
                if (condition) {
                    letsGo = true;
                if (i != upperBound) {
                    logTracer.printf("swap %s and %s\n",data[i],data[upperBound]);

                    swap(data, i, upperBound);

                    chartTracer.set(data);
                    chartTracer.select(lowerBound, upperBound);
                    Tracer.delay();
                    i--;
                }
                chartTracer.deselect(upperBound);
                upperBound--;
                }
            }
            
            bitNo--;
        }while(!letsGo && bitNo > 0);
        
        bitNo++;
        
        int hold = upperBound;
        
        if (upperBound == u_backup){
            hold = lowerBound;
        }
        else{
            hold = upperBound + 1;
        }
        
        //Again calling for divided subarry, and now for (bitNo - 1)th bit
        if(bitNo > 0 && (hold != u_backup || lowerBound != upperBound)){
            binarySort(data, (bitNo - 1), hold, u_backup);
            binarySort(data, (bitNo - 1), lowerBound, upperBound);
        }
    }

    private static void swap(Integer [] data, int x, int y) {
        int temp = data[x];
        data[x] = data[y];
        data[y] = temp;
        
        chartTracer.patch(x, data[x]);
        chartTracer.patch(y, data[y]);
        Tracer.delay();
        chartTracer.depatch(x);
        chartTracer.depatch(y);
    }
    
    private static void binaryOfAllNumbers(){
        for(int i=0; i<data.length; i++){
            logTracer.printf("%s [",data[i]);
            for(int bit=5; bit>=0; bit--){
                logTracer.printf(" %s",(data[i] >> bit) & 1);
            }
            logTracer.printf("]\n");
        }
    }
}
