# AStar path finding

<img src="https://cdn.jsdelivr.net/gh/zjl9959/algviz-launch@master/svgs/AStarPathFinding_sec.svg" width=240px/>

AStar(A*) is an effective path-finding algorithm for a grid map (such as a 2D maze).
A* algorithm uses breadth-first search as the basic framework, but it uses a priority queue to sort the point to be explored. The algorithm will explore the point in the front of the priority queue first.

The key of the priority queue is the `hamiltonDistance(start, candidate) + hamiltonDistance(candidate, end)` and the value is the candidate point. The keys in the priority queue are heuristic information to guide the algorithm to explore the points that are more likely to be on the shortest path. So A* algorithm is more effective than the breadth-first search algorithm.

## Complexity

**Time Complexity:** `O(R·C)` for the worst case, `O(R + C)` for the best case.

**Space Complexity:** `O(R·C) ~ O(R + C)` cost by the priority queue.

*`R` is the grid map's row number and `C` is the grid map's column number.*

## Reference

+ [redblobgames - introduction to the A* Algorithm](https://www.redblobgames.com/pathfinding/a-star/introduction.html)
+ [algviz - an algorithm animation engine for Python](https://github.com/zjl9959/algviz-launch)
