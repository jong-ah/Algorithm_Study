// https://programmers.co.kr/learn/courses/30/lessons/42888

// 시간 복잡도
/**********************************************************************
record.map 1회 / recordArr.forEach 2회
계수 및 상수를 버리므로
3n = O(n)
***********************************************************************/

// 개선점
/**********************************************************************
switch case문 사용으로 코드 가독성 향상
el[n]과 같은 변수보다는 구조분해할당으로 더 알아보기 쉽게
***********************************************************************/

function solution(record) {
  let idToName = {};
  let recordArr = record.map((el) => el.split(" "));
  let resultMsg = [];

  recordArr.forEach((el) => {
    if (el[0] === "Enter" || el[0] === "Change") {
      idToName[el[1]] = el[2];
    }
  });

  recordArr.forEach((el) => {
    if (el[0] === "Enter") {
      resultMsg.push(`${idToName[el[1]]}님이 들어왔습니다.`);
    }
    if (el[0] === "Leave") {
      resultMsg.push(`${idToName[el[1]]}님이 나갔습니다.`);
    }
  });

  return resultMsg;
}
