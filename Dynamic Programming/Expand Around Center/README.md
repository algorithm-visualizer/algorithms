# Expand Around Center

The "expand around center" approach is a common algorithmic technique used to solve problems related to palindromes or symmetric sequences. The basic idea is to consider each position in the sequence as a possible center of a palindrome and then expand outwards in both directions from that center to find the longest palindrome or the number of palindromic substrings.

For example, consider the string "racecar". We can start by considering each character in the string as a possible center, and then expand around it to check if it forms a palindrome. If we start with the center at index 3 (the letter "e"), we can expand outwards in both directions to find that the longest palindrome centered at index 3 is "cec". Similarly, we can check all other centers to find the longest palindrome in the string.

The "expand around center" approach is a simple and efficient way to solve many palindrome-related problems. It can be used to find the longest palindromic substring in a given string, count the number of palindromic substrings, or check if a given string is a palindrome.

The "expand around center" approach is efficient, with a time complexity of O(n^2), where n is the length of the input string.

## References

- [@bhprtk/longest-palindromic-substring](https://medium.com/@bhprtk/longest-palindromic-substring-a8190fab03ff#:~:text=Expand%20Around%20Center%3A,the%20center%20is%20%22bb%22%20.)
