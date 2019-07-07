//A Hamiltonian cycle is a cycle in an undirected or directed graph that visits each vertex exactly once.
// import visualization libraries {
import org.algorithm_visualizer.*;
import java.util.Random;
// }

class Main {
    // define tracer variables {
    GraphTracer graphTracer=new GraphTracer("GraphTracer");
    LogTracer logTracer = new LogTracer("Console");
    // }
    int n=8;
    int x[];
    int found=0;
    int vis[];
    int[][] adjacencyMatrix;
    void ham(int k) {
		while(true)
		{
			nextVal(k);
			if(x[k]==-1)
				return;
			if(k==n-1)
			{
			    graphTracer.visit(x[0],x[k]);
				graphTracer.delay();
				found=1;
				//Printint the cycle{
				for(int i=0;i<n;i++)
					logTracer.print((x[i])+"  ");
				logTracer.println(0);
				//}
				graphTracer.leave(x[0],x[k]);
			}
			else
				ham(k+1);
		}
	}
	void nextVal(int k)
	{
		while(true) {
			int i=0;
			if(vis[k]==1)
			    graphTracer.leave(x[k],x[k-1]);
			vis[k]=0;
			x[k]=(x[k]+1)%(n+1);
			if(x[k]==n)
			{
				x[k]=-1;
				return;
			}
			graphTracer.visit(x[k],x[k-1]);
		    graphTracer.delay();
		    vis[k]=1;
			if (adjacencyMatrix[x[k-1]][x[k]]==1)
			{
				for(i=0;i<k;i++)
					if(x[i]==x[k])
						break;
				if(i==k)
					if(k<n-1 || k==n-1 && adjacencyMatrix[x[k]][x[0]]==1)
						return;
			}
		}
	}

    Main() {
        //initializing{
        adjacencyMatrix=new int[n][n];
        x=new int[n];
        vis=new int[n];
        Random r=new Random();
        for(int i=1;i<n;i++)
			x[i]=-1;
        //}
        
        //Randomizing adjacancy matrix and displaying on log screen{
        logTracer.println("The adjacancy matrix is");
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                adjacencyMatrix[i][j]=r.nextInt(2);
                logTracer.print(adjacencyMatrix[i][j]+"  ");
            }
            logTracer.println("");
        }
        //}
        
        // visualize {
        Layout.setRoot(new VerticalLayout(new Commander[]{graphTracer, logTracer}));
        graphTracer.set(adjacencyMatrix);
        // }
        
        logTracer.println("The possible solutions are");
        ham(1);
        if(found==0)
            logTracer.println("No cycles are found Try with a different graph ");
    }

    public static void main(String[] args) {
        new Main();
    }
}
