'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/64065?language=javascript

// TODO 튜플
/*********************************************************************** 
input으로 문자열 튜플(어떤 순서를 따르는 요소들의 모음)이 들어오고
output으로 튜플이 표현하는 배열을 리턴해야한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
* 가장 많은 요소가 배열의 값이고, 적은 수의 요소가 차례대로 순서 차지한다.
1. 문자열이고, value or key값이 ㅇ벗는 object이므로 array 형태로 바꿔준다.
2. array 형태의 앞, 뒤 요소를 비교하여 최종 순서를 answer에 push한다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 for문(or filter, sort, map)의 영향을 받아 O(N)일 것 같다. N : s.lenght
 * 개선하게 된다면, split와 filter 대신 replace를 사용할 수 있다.
 ***********************************************************************/

function solution(s) {
  var answer = [];

  // {}을 제거하고 이중배열로 만들기
  const temp = s
    .split(/{|}/g)
    .filter((x) => x.length > 0 && x !== ',')
    .sort((a, b) => a.length - b.length)
    .map((x) => x.split(',').map(Number));

  console.log(temp);

  // 지금 배열과 이전 배열을 비교하여 다른 것을 answer로 추가하기
  for (let i = 0; i < temp.length; i++) {
    if (i === 0) {
      answer.push(...temp[i]);
    } else {
      answer.push(...temp[i].filter((x) => !temp[i - 1].includes(x)));
    }
  }

  return answer;
}

// let s = '{{2},{2,1},{2,1,3},{2,1,3,4}}';
let s = '{{1,2,3},{2,1},{1,2,4,3},{2}}';
let output = solution(s);
console.log(output);
