const { Tracer, Array1DTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new Array1DTracer('Longest Palindromic Substring');
Layout.setRoot(new VerticalLayout([tracer]));

function expandAroundCenter(s, left, right) {
  tracer.select(left, right);
  Tracer.delay();

  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
    tracer.select(left, right);
    Tracer.delay();
  }

  tracer.deselect(left, right);
  return right - left - 1;
}

function longestPalindromicSubstring(s) {
  if (s.length === 0 || s.length === 1) {
    return s;
  }

  let start = 0;
  let end = 0;

  tracer.set(s);
  Tracer.delay();

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(s, i, i);
    const len2 = expandAroundCenter(s, i, i + 1);
    const maxLen = Math.max(len1, len2);

    if (maxLen > end - start) {
      start = i - Math.floor((maxLen - 1) / 2);
      end = i + Math.floor(maxLen / 2);
    }
  }

  tracer.select(start, end);
  Tracer.delay();
  tracer.deselect(start, end);

  return s.slice(start, end + 1);
}

const input = 'babad';
console.log(longestPalindromicSubstring(input));  // Output: "bab" or "aba"
