//! 문제 설명
/*
    정수를 요소로 갖는 배열을 입력받아 3개의 요소를 곱해 나올 수 있는 최대값을 리턴해야 합니다.
*/

//! 제한 사항
//? 1. 입력으로 주어진 배열은 중첩되지 않은 1차원 배열입니다.
//? 2. 배열의 요소는 음수와 0을 포함하는 정수입니다.
//? 3. 배열의 길이는 3 이상입니다.

const largestProductOfThree = function (arr) {
  //? 1. 문제 이해
  /*
    이번에도 입출력 예시에 정렬이 되어있지 않아 우선 정렬을 해주었다.
    length 를 편하게 사용하기 위해 따로 변수로 빼주었다.
    음수도 포함되어 있는 배열이기 때문에 두 가지 경우의 수가 나온다.
    양수로만 곱했을때의 최댓값, 음수 2개와 양수 1개를 곱했을때의 최댓값
    그래서 그냥 배열을 정렬해주고 맨 뒤에서부터 3개를 가져오고,
    맨 뒤에 숫자 하나와 맨 앞의 숫자 2개를 가져와서 나온 결과 두 a, b
    중에 값이 더 큰 것이 최댓값이 된다.
  */

  //? 2. 시간복잡도
  //* arr.sort 를 한 번 사용하기 때문에 O(nlogn) 의 시간복잡도를 가지게된다.

  //? 3. 개선점
  //* 음 개선점은 딱히 없어보인다. 레퍼런스와 매우 똑같이 풀었다.
  const sorted = arr.sort((a, b) => a - b);
  const length = sorted.length;

  let a = sorted[length - 1] * sorted[length - 2] * sorted[length - 3];
  let b = sorted[length - 1] * sorted[0] * sorted[1];

  return Math.max(a, b);
};

//! 입출력예시
console.log(largestProductOfThree([2, 1, 3, 7])); //* 결과: 42
console.log(largestProductOfThree([-1, 2, -5, 7])); //* 결과: 35
