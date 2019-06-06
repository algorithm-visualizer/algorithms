// import visualization libraries {
import org.algorithm_visualizer.*;
import java.util.Random;
// }

class Main {
    // define tracer variables {
    Array1DTracer array1dTracer = new Array1DTracer("Set");
    LogTracer logTracer = new LogTracer("Console");
    // }

    // define input variables
    int n;
    int s[];
    int d;
    
    void solve()
	{
		int[] sel=new int[n+1];
		int k=0,sum=0,found=0;
		sel[0]=1;
		array1dTracer.select(k);
		Tracer.delay();
		while(true) {
			if(k<n && sel[k]==1) {
				if(sum+s[k]==d)
				{
					found=1;
					logTracer.print("{");
					for(int i=0;i<n;i++)
						if(sel[i]==1)
							logTracer.print(s[i]+"  ");
					logTracer.println("}");
					sel[k]=0;
					Tracer.delay();
					array1dTracer.deselect(k);
					Tracer.delay();
				}
				else if(sum+s[k]<d)
					sum+=s[k];
				else{
					sel[k]=0;
					array1dTracer.deselect(k);
					Tracer.delay();
				}
			}
			else
			{
				k--;
				while(k>=0 && sel[k]==0)
					k--;
				if(k<0)
					break;
				sel[k]=0;
				array1dTracer.deselect(k);
				Tracer.delay();
				sum-=s[k];
			}
			k++;
			if(k<n){
			    sel[k]=1;
			    array1dTracer.select(k);
			    Tracer.delay();
			}
		}
		if(found==0)
			logTracer.println("Not possible subsets");
	}

    Main() {
        // visualize {
        Layout.setRoot(new VerticalLayout(new Commander[]{array1dTracer, logTracer}));
        Tracer.delay();
        // }
		n=10;
		//Randomizing the array{
		s=new int[n];
		Random r=new Random();
		for(int i=0;i<n;i++)
		    s[i]=r.nextInt(30);
		d=r.nextInt(100);
		//}
		
		logTracer.print("The Given set is: ");
		for(int x:s)
		    logTracer.print(x+",");
		logTracer.println("\nDesired sum is:"+d);
		logTracer.println("The possible subsets of sum "+d+" are: ");
		array1dTracer.set(s);
		Tracer.delay();
		solve();
    }

    public static void main(String[] args) {
        new Main();
    }
}
