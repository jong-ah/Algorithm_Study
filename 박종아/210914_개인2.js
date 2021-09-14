'use strict';

// * https://urclass.codestates.com/codeproblem/b8460488-e438-4459-b169-e6840235a1a0

// TODO findAbbreviation
/*********************************************************************** 
input으로 strA, strB 2개의 문자열을 받는다.
strA의 소문자를 대문자로 변경하거나 제거하여 strB와 같게 만들면 output으로 true, 같게 만들지 못 하면 false가 리턴한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 처음 set을 이용하여 중복된 값을 없애려고 했다.
2. filter, map 사용이 있어 set을 없애고 배열로 해서 만들었다.
3. 시간복잡도 : filter, map, match은 O(N)인데  differenceB는 연이어 있으니깐  O (n ^ 2)
4. 효율성에서 통과가 안 되었다. 코드스테이츠 답을 보니 memo를 활용했다.
5. 아직 memo와 반복합수가 어렵다. 이곳에서도 memo에 저장하기만 하고 사용하지 않는 것 같은데 필요할까?
6. 반복함수를 사용하는 것은 알겠다., (0,0)와 같이 먼저 생각해 사용해본 적은 없지만 사용해봐야겠다.
***********************************************************************/

// ! 차집합 활용
function 효율성탈락() {
  function findAbbreviation(strA, strB) {
    // TODO: 여기에 코드를 작성합니다.
    let arrA = strA.split('');
    let arrB = strB.split('');

    // arrB엔 없고 arrA에만 있는 요소
    let differenceA = arrA.filter((x) => !arrB.includes(x)).join('');
    // arrB엔 있고 arrA엔 없는 요소 (대소문자 상관없이 완전 다른 알파벳)
    let differenceB = arrB
      .map((x) => x.toUpperCase())
      .filter((x) => !arrA.map((x) => x.toUpperCase()).includes(x))
      .join('');

    let regexp = /[A-Z]/g;
    // differenceA에 대문자가 있으면 false
    // differenceB에 문자가 있으면 false
    if (differenceA.match(regexp) || differenceB !== '') return false;
    else return true;
  }

  // let strA = 'cccCoddFE';
  // let strB = 'CODE'; // false
  // let strA = 'AbcDE';
  // let strB = 'AFDE'; // false
  let strA = 'daBcd';
  let strB = 'ABC'; // true
  let result = findAbbreviation(strA, strB);
  console.log(result);
}

효율성탈락();

// ! memoization
function 코드스테이츠() {
  function findAbbreviation(strA, strB) {
    const N = 100;
    // 중복 계산을 제거하기 위한 memo 2차원 배열
    // 계산되지 않은 상태를 -1로 초기화한다.
    const memo = [];
    for (let i = 0; i < N; i++) memo.push(Array(N).fill(-1));

    const isLower = (chr) => chr.toUpperCase() !== chr;

    const aux = (leftIdx, rightIdx) => {
      // 이미 계산한 적이 있는 경우, 저장된 값을 사용한다.
      if (memo[leftIdx][rightIdx] !== -1) return memo[leftIdx][rightIdx];

      // base case
      // strB를 끝까지 다 비교하였을 경우,
      // strA가 뒷부분이 모두 소문자이면 true, 아니면 false
      // strB보다 strA를 먼저 끝까지 다 비교하였을 경우, false
      if (rightIdx === strB.length)
        return strA.substring(leftIdx).split('').every(isLower);
      else if (leftIdx === strA.length) return false;

      // recursive case
      // 소문자 strA가 strB와 다를 경우,
      // 대문자 strA도 strB와 다르다면, strA의 다음 요소와 비교한다. (없는 셈 치고)
      // 대문자 strA와 strB와 같다면, 둘 다 다음 요소와 비교하거나 strA 다음 요소랑 비교한다. (있어도 되고, 없어도 되고)
      if (isLower(strA[leftIdx])) {
        if (strA[leftIdx].toUpperCase() !== strB[rightIdx]) {
          // 중복 계산을 피하기 위해 계산의 결과를 저장한다.
          memo[leftIdx + 1][rightIdx] = aux(leftIdx + 1, rightIdx);
          //   console.log(memo[leftIdx + 1][rightIdx])
          return memo[leftIdx + 1][rightIdx];
        }
        memo[leftIdx + 1][rightIdx + 1] = aux(leftIdx + 1, rightIdx + 1);
        memo[leftIdx + 1][rightIdx] = aux(leftIdx + 1, rightIdx);
        return memo[leftIdx + 1][rightIdx + 1] || memo[leftIdx + 1][rightIdx];
      } else {
        // 대문자 strA가 strB와 다를 경우, false 리턴한다.
        // 대문자 strA와 strB가 같을 경우, 다음 요소(+1)를 비교하여 memo에 저장한다.
        if (strA[leftIdx] !== strB[rightIdx]) return false;
        memo[leftIdx + 1][rightIdx + 1] = aux(leftIdx + 1, rightIdx + 1);
        return memo[leftIdx + 1][rightIdx + 1];
      }
    };

    return aux(0, 0);
  }

  let strA = 'daBcd';
  let strB = 'ABC'; // true
  let result = findAbbreviation(strA, strB);
  console.log(result);
}

코드스테이츠();
