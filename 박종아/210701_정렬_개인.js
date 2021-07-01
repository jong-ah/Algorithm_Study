'use strict';

// * https://www.acmicpc.net/problem/18870
// 백준 정렬 문제 모음 https://www.acmicpc.net/step/9

// TODO 좌표압축 이해하기
/***********************************************************************
  좌표압축은 '순위가 중요한 알고리즘에서, 입력값의 갯수보다 입력값의 범위가 클 때 사용하는 방법'
  1이 앞자리고, 100이 뒷자리인 자리에서 총 5명이 앉았는데 그 5명 중에 2번째로 앞자리에 앉은 사람은 누구인가?
  100 자리 다 탐색하지 말고, 5명이니깐 5자리로 압축하여 탐색한다.
  // 참고설명1 https://torbjorn.tistory.com/274
  // 참고설명2 https://www.singun11.wtf/57
***********************************************************************/

// TODO 수도코드
/***********************************************************************
 // ? 1. 주어진 배열 [2,4,-10,4,-9], 공통요소를 없앤 sort된 배열 [-10,-9,2,4]를 가진다.
 // 공통요소를 없애는 방법은 filter((v,i,arr))를 하거나, set를 사용할 수 있다.
 // ? 2. 이진탐색트리 doBst함수를 만들어 sort 배열을 기준으로 sort된 배열 요소와 주어진 배열의 요소같은 index를 리턴한다. 
 // ? 3. 리턴한 index값을 result에 더해 답을 구한다.
 // ! indexOf에서 시간초과가 된다. 이 문제는 이진탐색트리로 해결한다.
 // ! '정답은_이것'에서 map((v)-> +v)을 사용해 number로 안 바꾸면 틀린다.
 // number로 안 바꿔도 정답은 나온다. 그러나 통과가 안 된다.
 // * map(Number) === map((v)=> +v) 같다니 신기하다.
***********************************************************************/

const 시간초과 = () => {
  // const fs = require('fs');
  // const input = fs.readFileSync('dev/stdin').toString().split('\n');
  const input = `5
2 4 -10 4 -9`.split('\n');

  const N = input.shift();
  const arr = input[0].split(' ');
  const arr2 = [...new Set(arr)].sort((a, b) => a - b);
  let result = '';

  for (let i = 0; i < N; i++) {
    result += arr2.indexOf(arr[i]) + ' ';
  }

  console.log(result); // 2 3 0 3 1
};

시간초과();

/***********************************************************************/

const 정답은_이것 = () => {
  // const fs = require('fs');
  // const input = fs.readFileSync('dev/stdin').toString().split('\n');
  const input = `5
2 4 -10 4 -9`.split('\n');

  const doBst = (array, target) => {
    let left = 0;
    let right = array.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (array[mid] < target) {
        left = mid + 1;
      } else if (array[mid] > target) {
        right = mid - 1;
      } else {
        left = mid;
        break;
      }
    }
    return left;
  };

  input[1] = input[1].split(' ').map((v) => +v);
  const array = [...new Set(input[1])].sort((a, b) => a - b);
  console.log(array);

  let result = '';
  for (const e of input[1]) {
    const index = doBst(array, e);
    result += index + ' ';
  }

  console.log(result); // 2 3 0 3 1
};

정답은_이것();
