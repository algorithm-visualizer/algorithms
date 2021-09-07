import java.util.Random;
// import visualization libraries {
import org.algorithm_visualizer.*;
// }

class Main {
    // define tracer variables {
    Array1DTracer inputTracer = new Array1DTracer("Input");
    Array1DTracer treeTracer = new Array1DTracer("Tree");
    Array1DTracer rangeTracer = new Array1DTracer("Range");
    LogTracer logTracer = new LogTracer("Console");
    // }

    // define input variables
    int range[];
    int parent[];
    int input[];
    int tree[];
    int n;
    
    // Finds parents for BIT
    void findParent(){
        for(int i = 1; i < n + 1; i++){
            int p = i - (i & -i);
            parent[i] = p;
        }
    }
    // Correctly selects par to par + (i & -i)
    void selectRange(int i){
        int par = parent[i];
        for(int ind = par; ind < par + (i & -i); ind++){
            rangeTracer.select(ind);
        }
    }
    void update(int val, int index, int n){
        index = index + 1;
        while(index <= n){
            // Show updating of current index
            logTracer.println("Currently updating index: " + index);
            treeTracer.patch(index, tree[index] + val);
            selectRange(index);
            Tracer.delay();
            // Deselect and delay
            for(int i = 0; i < n; i++){
                rangeTracer.deselect(i);
            }
            treeTracer.depatch(index);
            Tracer.delay();
            tree[index] += val;
            index += (index & -index);
        }
    }
    
    void solve(){
        for(int i = 0; i < input.length; i++){
            inputTracer.select(i);
            logTracer.println("Adding " + input[i] + " to tree");
            Tracer.delay();
            update(input[i], i, n);
            Tracer.delay();
            inputTracer.deselect(i);
        }
        Random gen = new Random();
        int left = gen.nextInt(n) + 1;
        int right = Math.min(gen.nextInt(n - 1) + left + 1, n - 1);
        logTracer.println("Finding sum between: (" + left + ", " + right + ")");
        int r = query(right);
        int l = query(left - 1);
        logTracer.println("Left to right sum is: " + (r - l));
    }
    
    int query(int index){
        int total = 0;
        logTracer.println("Calculating sum for 0 to " + index);
        index = index + 1;
        while(index >= 1){
            logTracer.println("Current total: " + total);
            int nextIndex = index - (index & -index);
            treeTracer.select(index);
            // Select range represented by tree index and deselect afterwards
            selectRange(index);
            Tracer.delay();
            for(int i = 0; i < n; i++){
                rangeTracer.deselect(i);
            }
            total += tree[index];
            index = nextIndex;
        }
        logTracer.println("Total sum is: " + total);
        return total;
    }
    
    Main() {
        // visualize {
        Layout.setRoot(new VerticalLayout(new Commander[]{rangeTracer, inputTracer, treeTracer, logTracer}));
        Random gen = new Random();
        n = gen.nextInt(20) + 5;
        // Loads neccessary arrays
        input = new int[n];
        range = new int[n];
        tree = new int[n + 1];
        parent = new int[n + 1];
        // Calculate parents
        findParent();
        for(int i = 0; i < n; i++){
            input[i] = gen.nextInt(30);
        }
        inputTracer.set(input);
        treeTracer.set(tree);
        rangeTracer.set(range);
        // treeTracer.set(tree);
        // Tracer.delay();
        // }
        solve();
    }

    public static void main(String[] args) {
        new Main();
    }
}
