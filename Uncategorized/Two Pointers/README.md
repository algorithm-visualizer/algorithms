# Two Pointers

Two pointers algorithm is a very useful technique in solving many problems, especially those that require scanning through arrays or lists.

One practical example of using the two pointers algorithm is in finding pairs of numbers in an array that add up to a given target value. 

But, I prefer to provide example from the [leetcode](https://leetcode.com/problems/container-with-most-water/).

![question_11.jpg](img%2Fquestion_11.jpg)

```
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

## Complexity
* **Time**: O(n)
* **Space**: O(1)

## References:

* [DSA: Two-pointers algorithm. Review with the step-by-step guide](https://medium.com/@alexeyskrobot/dsa-two-pointers-algorithm-review-with-the-step-by-step-guide-e8368e11a144)
