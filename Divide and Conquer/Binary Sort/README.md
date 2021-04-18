# BinarySort
Binary sort is an algorithm that sorts the given array of numbers based on its binary value.

# How to use
1. First compile both C file using following command: "gcc -o BinarySort BinarySort.c" & "gcc -o Generator Generator.c"
2. Then run "Generator.exe" file using following command: "Generator.exe 10000 Data.txt" - Here 10000 is size of array which is going to be generated.
3. It will generate Data.txt file, filled with 10000 random numbers.
4. Then run "BinarySort.exe" file using following command: "BinarySort.exe 10000 Data.txt" for windows & "./BinarySort 10000 Data.txt" for linux
5. It will use Data.txt file as an input to the algorithm and sort thos data and will generate "Sorted Data.txt" file which is sorted output.

# Working of an algorithm
* This algorithm is based on binary value of the numbers.

```
8 - 1000
5 - 0011
6 - 0110

    4th bit         4th bit(R)         4th bit(R)         3rd bit(L)         3rd bit(L)
+-----------+    +-------+ +---+    +-------+ +---+    +-------+ +---+    +---+ +---+ +---+     Everything is fixed
| 8 | 5 | 6 | -> | 6 | 5 | | 8 | -> | 6 | 5 | | 8 | -> | 6 | 5 | | 8 | -> | 5 | | 6 | | 8 | ->  so arry is solved
+-----------+    +-------+ +---+    +-------+ +---+    +-------+ +---+    +---+ +---+ +---+     easily without 
  L       U        L   U     U=L      L   U    Fix       L   U    Fix      Fix   Fix   Fix      comparing single no.
  
 Input array     Found 4th bit of   Recursion call     Recusion call for  Found 3rd bit of
                 8 is *1* so swap   right array is     left array for     6 is *1* so swap
                 with number at U   sorted.            *bitNo* 3.         with number at U
                 and devide the                                           and decide the 
                 array.                                                   array.
```
