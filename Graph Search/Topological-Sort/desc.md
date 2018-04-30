# Topological-Sort
Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge uv, vertex u comes before v in the ordering. Topological Sorting for a graph is not possible if the graph is not a DAG. NOTE: when the graph is represented as an Adjacency Matrix, the Calculation of in-degree Array becomes O(|V|<sup>2</sup>)

## Applications
* Job Scheduling
* Instruction Scheduling
* Logic Synthesis
* Determining the order of compilation tasks to perform in makefiles
* Data serialization

## Complexity
* **Time**: worst ![](https://latex.codecogs.com/svg.latex?O(|V|+|E|))
* **Space**: worst ![](https://latex.codecogs.com/svg.latex?O(|V|))

## References
* [GeeksForGeeks](http://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/)
* [GeeksForGeeks](http://www.geeksforgeeks.org/topological-sorting/)