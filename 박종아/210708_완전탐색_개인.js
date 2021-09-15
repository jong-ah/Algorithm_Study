'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/42839?language=javascript#

// TODO 소수찾기 이해하기
/***********************************************************************
  종이 조각으로 만들 수 있는 숫자는 주머니 안에서 보지 않고 종이 조각을 빼는 것과 같다.
  1과 7이 있을 경우, 하나씩만 뽑아 1 하나, 7 하나 뽑을 수 있고,
  두개를 뽑아 17, 71이 될 수도 있다.
  1일 뽑혔으므로 1을 또 뽑을 수 없다. 11 no
  종이 조각 이상의 것을 뽑을 수 없다. 127 no 
***********************************************************************/

// TODO 수도코드
/***********************************************************************
 // ? 1. 종이 조각으로 수를 만드는 것은 순열을 사용한다. getPermutations
 // ? 2. 순열로 나올 수 있는 모든 수를 구한다면 그 수가 소수인지 아닌지 확인한다. isPrime
 // ? 3. 소수라면 1을 더하고, 모든 수를 확인했으면 리턴한다.
***********************************************************************/

// 소수 확인
const isPrime = (num) => {
  if (num === 1 || num === 0) return false;
  if (num === 2) return true;
  for (let i = 2; i < num / 2 + 1; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// 순열 구하기
const getPermutations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((value) => [value]);

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutations(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return results;
};

// 순열이 소수인지 확인하기
function solution(numbers) {
  let answer = 0;
  const arr = Array.from(numbers);
  const store = [];

  for (let i = 1; i <= numbers.length; i++) {
    const permutations = getPermutations(arr, i).map((res) =>
      Number(res.join(''))
    );
    permutations.forEach((permutation) => {
      if (!store.includes(permutation)) {
        store.push(permutation);
        answer += isPrime(permutation) ? 1 : 0;
      }
    });
  }

  return answer;
}

const numbers = '17';
const result = solution(numbers);
console.log(result);

/******* 테스트 *******
테스트 1 〉	통과 (0.59ms, 30.2MB)
테스트 2 〉	통과 (20.53ms, 34.7MB)
테스트 3 〉	통과 (0.28ms, 30.1MB)
테스트 4 〉	통과 (9.20ms, 35.1MB)
테스트 5 〉	통과 (61.07ms, 43.1MB)
테스트 6 〉	통과 (0.28ms, 30.1MB)
테스트 7 〉	통과 (0.62ms, 29.9MB)
테스트 8 〉	통과 (93.52ms, 44.5MB)
테스트 9 〉	통과 (0.37ms, 30MB)
테스트 10 〉	통과 (80.83ms, 35MB)
테스트 11 〉	통과 (6.69ms, 32.7MB)
테스트 12 〉	통과 (1.29ms, 30.3MB)
*******************/
