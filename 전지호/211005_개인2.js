//! 문제 설명
/*
    두 개의 배열(base, sample)을 입력받아 sample이 base의 부분집합인지 여부를 리턴해야 합니다.
    boolean 타입을 return 해야 합니다.
*/

//! 제한 사항
//? 1. base, sample 내에 중복되는 요소는 없다고 가정합니다.

const isSubsetOf = function (base, sample) {
  //? 1. 문제이해
  /*
    먼저 입출력 예시를 보았을때 두 배열은 정렬이 되어있지 않았다.
    두 배열의 값을 비교하기 위해 먼저 정렬을 진행해주었다.
    sampleValue 와 sampleIdx 라는 변수를 만들어주고, sampleValue 에는 sample 의 맨 처음 요소를 담아주었다.
    그리고 base 의 반복을 돌려서 base[i] 와 sampleValue 의 값이 일치하다면 sampleIdx 의 값을 하나 올려주고
    sampleValue 의 값을 다음 sample 의 요소로 바꾸어주었다.
    문제의 조건중에 Advanced 난이도로 70,000 개의 길이 이상의 속도를 통과하라고 있어서
    탐색을 끝까지 가지않고 조건이 충족된다면 중간에 벗어나도록 바꾸어주었다.
  */

  //? 2. 시간복잡도
  //* for 문 하나만 사용하며 조건을 사용해 검사해주었다. for 문이 sort 보다 시간복잡도가 높으므로 O(n) 의 시간복잡도를 가진다.

  //? 3. 개선점
  //* 레퍼런스 코드를 보았는데 for 문 안에서 재귀함수를 사용해서 음.. 내 코드가 좀 더 나은듯 하다 ㅎ

  base.sort();
  sample.sort();

  let sampleValue = sample[0];
  let sampleIdx = 0;

  for (let i = 0; i < base.length; i++) {
    if (sampleIdx === sample.length - 1) {
      return true;
    }

    if (sampleValue === base[i]) {
      sampleIdx++;
      sampleValue = sample[sampleIdx];
    }
  }

  if (sampleIdx !== sample.length - 1) {
    return false;
  }

  return true;
};

//! 입출력 예시
console.log(isSubsetOf([1, 2, 3, 4, 5], [1, 3])); //* 결과: true
console.log(isSubsetOf([1, 2, 3, 4, 5], [6, 7])); //* 결과: false
console.log(isSubsetOf([10, 99, 123, 7], [11, 100, 99, 123])); //* 결과: false
