//! 문제 설명
/*
   자연수의 집합(set)과 자연수(bound)를 입력받아 아래의 조건을 만족하는 가장 큰 수를 리턴해야 합니다.

   - 집합의 요소를 최대 한번씩만 더해서 만들어야 한다.
   - `bound`를 넘지 않아야 한다.
*/

//! 제한 사항
//? 1. set 은 자연수를 요소로 갖는 배열
//? 2. bound 는 number 타입의 자연수(bound <= 300)
//? 3. number 타입을 return 해야 합니다
//? 4. 조건을 만족하는 조합이 없는 경우, 0 을 리턴해야 합니다.

const permutation = function (el, sliceArr, result, bound) {
  if (sliceArr.length <= 1) {
    return 0;
  }

  let sum = el;

  for (let i = 0; i < sliceArr.length; i++) {
    sum += sliceArr[i];

    if (sum <= bound) {
      result.push(sum);
    } else if (sum > bound) {
      if (el + sliceArr[i] <= bound) {
        sum = el + sliceArr[i];
        result.push(sum);
      } else {
        sum = el;
      }
    }
  }
};

const subsetSum = function (set, bound) {
  //? 1. 문제이해
  /*
    처음에 입출력 예시에 원소가 하나씩만 있어서 각자 하나의 원소들만 더해주면 되는건줄 알았다.
    그런데 모든 원소를 더해가며 구하는 거였다.
    순열을 이용해서 풀었는데 마지막 케이스인 효율적인 알고리즘을 짜지는 못하였다.
  */

  //? 2. 시간복잡도
  //* for 문이 2 번 겹치는 것이므로 O(n^2) 이 될 것이다.

  //? 3. 개선점
  //* 사실 urclass 코드는 레퍼런스를 보면 개선할 수 있기에.. 저걸 보고 코드에 적용시키면 된다.
  //* 마지막 테스트 케이스는 항상 숨겨져있어서 답을 알 수 없어 답답한데.. 레퍼런스 코드를 콘솔을 찍어보면서 내 코드와 무슨 점이 다른지 찾아봐야겠다.

  let min = Math.min(...set);
  let max = Math.max(...set);
  let result = [];

  if (min > bound) {
    return 0;
  }

  for (let i = 0; i < set.length; i++) {
    permutation(set[i], set.slice(i + 1), result, bound);
  }

  if (result.length === 0 && max <= bound) {
    return max;
  }

  return Math.max(...result);
};

//! 입출력 예시
console.log(subsetSum([1, 8, 3, 15], 10)); //* 결과: 9
console.log(subsetSum([20, 80, 99, 27, 35], 100)); //* 결과: 100
console.log(subsetSum([10, 20, 15, 25, 30], 5)); //* 결과: 0
