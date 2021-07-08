'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/42842?language=javascript

// TODO 카펫 이해하기
/***********************************************************************
  바깥줄 brown, 안쪽 yellow인 카펫의 크기를 구한다.
  바깥줄만 brown이 해당하므로 yellow 수가 더 클 수 있다.
  주어진 [brown, yellow] 값엔 0이 없다.
  카펫의 가로 길이는 세로 길이와 같거나, 세로 길이보다 길다. (가로 >= 세로)
***********************************************************************/

// TODO 수도코드
/***********************************************************************
 // ? 1. 주어진 값의 합의 약수가 답이라고 생각되어 약수 구하는 함수 getDivisor을 썼다.
 // ? 2. yellow는 최소 1개가 주어지고, brown은 yellow를 감싸는 구조이기 때문에 최소 3줄 이상이기 때문에 3부터 약수를 구했다.
 // ? 3. divisor 변수에 약수 배열을 할당하고, result는 divisor 배열의 끝의 값을 할당한다.
 // 끝의 값이 두 수의 차가 제일 적고, 테스트케이스에서 보니 정답으로 나올 확률이 높아 정했다. 
 // ? 4. 바깥줄이 brown이니깐 yellow는 가로, 세로에 -2를 한 값이여 한다. 이 조건을 만족하지 않는다면 끝에서부터 값을 재할당한다.
 // ? 5. 조건에 통과한 result를 리턴한다.
 // 완전탐색에 익숙한 거는 BFS, DFS여서 문제보고 멈칫했다. (BFS, DFS 카테고리는 따로 있다는 걸 깜빡했다.)
 // 완전탐색의 종류로는 브루트포스(for문 활용), 비트 마스크(이진법 표현), 백트레킹, 재귀함수, 순열, BFS, DFS가 있다.
 // 이건 for문 이용으로 완전탐색이다. 약수 구하는 값은 Math.sqrt 제곱근을 이용했다.
***********************************************************************/

function solution(brown, yellow) {
  const divisor = getDivisor(brown + yellow);
  let result = divisor.pop();

  // 바깥줄이 brown이니깐 yellow는 가로,세로에 -2를 한 값이다.
  while (yellow !== (result[0] - 2) * (result[1] - 2)) {
    result = divisor.pop();
  }
  return result;

  // 약수 구하기, 바깥 brown, 안쪽 yellow가 있으므로 최소 3줄부터 시작이다.
  function getDivisor(n) {
    const arr = [];

    for (var i = 3; !arr.flat().includes(i) && i <= Math.sqrt(n); i++) {
      if (n % i == 0) {
        arr.push([Math.floor(n / i), i]);
      }
    }
    return arr;
  }
}

let brown = 24;
let yellow = 24;
let output = solution(brown, yellow);
console.log(output);

/******* 테스트 *******
테스트 1 〉	통과 (0.09ms, 29.9MB)
테스트 2 〉	통과 (0.11ms, 29.9MB)
테스트 3 〉	통과 (1.14ms, 30.1MB)
테스트 4 〉	통과 (0.65ms, 29.8MB)
테스트 5 〉	통과 (0.24ms, 30MB)
테스트 6 〉	통과 (6.99ms, 30.2MB)
테스트 7 〉	통과 (8.59ms, 30.2MB)
테스트 8 〉	통과 (3.96ms, 30MB)
테스트 9 〉	통과 (10.14ms, 30.4MB)
테스트 10 〉	통과 (1.50ms, 30MB)
테스트 11 〉	통과 (0.12ms, 30.1MB)
테스트 12 〉	통과 (0.09ms, 30MB)
테스트 13 〉	통과 (0.09ms, 30MB)
*******************/
