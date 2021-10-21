// https://programmers.co.kr/learn/courses/30/lessons/12938

// 시간 복잡도
/**********************************************************************
n + s % n + n log n => O(n log n)??
->
개선 후 : O(s % n)
***********************************************************************/

// 개선점
/**********************************************************************
굳이 sort 할 필요 없이 뒤에서 부터 숫자를 더해주면 훨씬 빠르다
***********************************************************************/

// before
function solution(n, s) {
  if (n > s) return [-1];
  const answer = new Array(n).fill(parseInt(s / n));
  for (let i = 0; i < s % n; i++) answer[i]++;
  return answer.sort((a, b) => a - b);
}

// after
function solution(n, s) {
  if (n > s) return [-1];
  const answer = new Array(n).fill(parseInt(s / n));
  for (let i = n - 1; i > n - 1 - (s % n); i--) answer[i]++;
  return answer;
}

var n = 2;
var s = 9;
console.log(solution(n, s));
