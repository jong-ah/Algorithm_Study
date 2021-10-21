// https://programmers.co.kr/learn/courses/30/lessons/12938

// 시간 복잡도
/**********************************************************************
n + s % n + n log n => O(n log n)??
***********************************************************************/

// 개선점
/**********************************************************************

***********************************************************************/

function solution(n, s) {
  if (n > s) return [-1];
  const answer = new Array(n).fill(parseInt(s / n));
  for (let i = 0; i < s % n; i++) answer[i]++;
  return answer.sort((a, b) => a - b);
}

var n = 2;
var s = 9;
console.log(solution(n, s));
