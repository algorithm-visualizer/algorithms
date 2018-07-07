# Knuth-Morris-Pratt
searches for occurrences of a substring W with length K within a main string S with Length N by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin, thus bypassing re-examination of previously matched characters

## Applications
* Substring Search

## Complexity
* **Time**: worst ![](https://latex.codecogs.com/svg.latex?O(|N|+|K|))
* **Space**: worst ![](https://latex.codecogs.com/svg.latex?O(|K|))

## References
* [Wikipedia](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)