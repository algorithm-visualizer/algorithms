# Knuth–Morris–Pratt string-searching algorithm
KMP algorithm finds all occurrences of a string P (pattern) in another string (T).

The main idea is reading T char-by-char, and keep tracking on the largest prefix of P which is also a suffix of the part of T we have read, while fallbacking to shorter prefixes of P if necessary.

We pre-process P, using a very similar method, to get the correct fallback prefix for any case.

## Complexity
* **Time**:  ![](https://latex.codecogs.com/svg.latex?O(m+n))  where ![](https://latex.codecogs.com/svg.latex?m) is the length of P and ![](https://latex.codecogs.com/svg.latex?n) is the length of the T
* **Space**:  ![](https://latex.codecogs.com/svg.latex?O(m))

## References
* [Wikipedia](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
