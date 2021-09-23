// https://programmers.co.kr/learn/courses/30/lessons/12911

// 시간 복잡도
/**********************************************************************
n의 값이 바뀔때마다 다르게 되는데 수학적으로 이진수 수학적으로 접근해야하는지..?
***********************************************************************/

// 개선점
/**********************************************************************
시프트 연산자를 사용해 이진수 숫자를 직접적으로 조정
***********************************************************************/

function checkBinaryCount(n, binaryCount) {
  let binary = n
    .toString(2)
    .split("")
    .filter((v) => v === "1").length;
  return binary === binaryCount;
}

function solution(n) {
  let binaryCount = n
    .toString(2)
    .split("")
    .filter((v) => v === "1").length;
  while (n++) {
    if (checkBinaryCount(n, binaryCount)) return n;
  }
}
