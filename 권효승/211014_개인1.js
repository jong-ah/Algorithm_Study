// https://programmers.co.kr/learn/courses/30/lessons/12981

// 시간 복잡도
/**********************************************************************
반복문 n회 * indexOf 시간 복잡도 n => O(n^2)
***********************************************************************/

// 개선점
/**********************************************************************
indexOf로 너무 높은 시간이 소요되는 것 같아 아예 다른 방법이 없을까 찾아봤지만 다른 풀이는 보이지 않았음
***********************************************************************/

function solution(n, words) {
  let answer = 0;
  for (let i = 1; i < words.length; i++) {
    if (
      words[i - 1][words[i - 1].length - 1] !== words[i][0] ||
      words.indexOf(words[i]) !== i
    ) {
      answer = i + 1;
      break;
    }
  }
  return answer ? [answer % n ? answer % n : n, Math.ceil(answer / n)] : [0, 0];
}

var n = 3;
var words = [
  "tank",
  "kick",
  "know",
  "wheel",
  "land",
  "dream",
  "mother",
  "robot",
  "tank",
];

console.log(solution(n, words));
