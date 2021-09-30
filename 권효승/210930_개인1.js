// https://programmers.co.kr/learn/courses/30/lessons/81302

// 시간 복잡도
/**********************************************************************
배열 하나의 크기는 5*5로 한정,
그 배열이 n개 들어오므로
5*5*n => 25n => O(n) ?
***********************************************************************/

// 개선점
/**********************************************************************
if문 조건 설정을 더 깔끔하게 할 수 있지 않을까..
***********************************************************************/

function isValidKeep(place) {
  for (let i = 0; i < place.length; i++) {
    for (let j = 0; j < place.length; j++) {
      if (place[i][j] === "P") {
        // 오른쪽
        if (i + 1 < place.length) if (place[i + 1][j] === "P") return 0;
        // 아래
        if (j + 1 < place.length) if (place[i][j + 1] === "P") return 0;
        // 오른쪽 아래
        if (j + 1 < place.length && i + 1 < place.length) {
          if (place[i + 1][j + 1] === "P") {
            if (place[i + 1][j] === "O" || place[i][j + 1] === "O") return 0;
          }
        }
        // 왼쪽 아래
        if (i > 0 && j + 1 < place.length) {
          if (place[i - 1][j + 1] === "P") {
            if (place[i - 1][j] === "O" || place[i][j + 1] === "O") return 0;
          }
        }
        // 오른쪽 두 칸
        if (i + 2 < place.length)
          if (place[i + 2][j] === "P" && place[i + 1][j] === "O") return 0;
        // 아래 두 칸
        if (j + 2 < place.length)
          if (place[i][j + 2] === "P" && place[i][j + 1] === "O") return 0;
      }
    }
  }
  return 1;
}

function solution(places) {
  let answer = [];
  for (let i = 0; i < places.length; i++) answer.push(isValidKeep(places[i]));
  return answer;
}
