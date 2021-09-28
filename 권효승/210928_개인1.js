// https://programmers.co.kr/learn/courses/30/lessons/17687

// 시간 복잡도
/**********************************************************************
numberStr의 최대 길이는 m*t이며 최대 그만큼 반복문 실행되지만 m씩 증가하는 반복문이므로
O(m * t / m) -> O(t)
***********************************************************************/

// 개선점
/**********************************************************************

***********************************************************************/

function getFullStr(n, length) {
  let numberStr = "";
  let decimal = 0;

  while (numberStr.length < length) {
    numberStr += decimal.toString(n);
    decimal++;
  }
  return numberStr;
}

function solution(n, t, m, p) {
  let answer = "";
  let numberStr = getFullStr(n, m * t);

  for (let i = 0; i <= numberStr.length; i += m) {
    if (answer.length === t) break;
    answer += numberStr[i - 1 + p];
  }

  return answer.toUpperCase();
}

var n = 10;
var t = 10;
var m = 2;
var p = 1;
console.log(solution(n, t, m, p));
