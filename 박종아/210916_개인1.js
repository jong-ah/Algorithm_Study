'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/17677?language=javascript

// TODO 뉴스 클러스터링
/*********************************************************************** 
input으로 두 문자열(str1, str2)가 들어온다.
두 문자열를 두 개씩 묶어 만든 다중집합을 만든 다음 그 둘을 비교하여 교집합, 합집합을 만든다.
output으로 두 문자열 사이의 자카드 유사도(교집합/합집합)를 리턴한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
* 소문자, 대문자 신경쓰지 않는다.
* 65536을 곱한 후 소수점 아래를 버리고 정수부만 출력한다.
* 영문자로만 된 글자만 유효, 공백, 숫자, 특수문자는 버린다.
* 모두 공집합일 경우에는 나눗셈이 정의되지 않으니 따로 J(A, B) = 1로 정의한다.
1. 모두 toUpperCase()로 대소문자 상관없이 만든다.
2. 2개씩 묶은 집합을 만든다.
3. 두 집합의 교집합과 합집합을 구한다.
4. parseInt(교집합/합집합 * 65536)를 리턴한다. 
***********************************************************************/

// ! 틀린 이유 2가지
/***********************************************************************
1. 교집합을 만드는 과정에서 비교대상자의 같은 요소도 제거하면서 만들어야하는데 제거하지 않았다.
ex) [A, A, A]와 [A]의 교집합은 [A]인데, 제거 안 해서 [A, A, A]가 되어 틀렸다.
2. 교집합과 합집합이 모두 0일 경우에만 '65536'으로 리턴되어야 하는데, 하나만 0이 되어도 '65536'리턴했다.
ex) answer ? answer : 65536 으로 해서, 정답이 0인 것도 모두 '65536'으로 리턴되게 해서 틀렸다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 getMultiArr함수로 O(str.length -1), map으로 O(str.length -1)하여 O(2N)일 것 같다.
 * 개선하게 된다면, set를 활용하여 풀거나 교집합, 합집합 구하는 함수를 따로 떼어 만들 수 있을 것이다.
 ***********************************************************************/

// 영문자만 있는 쌍의 다중집합을 리턴한다.
function getMultiArr(str) {
  let arr = [];
  let regexp = /[A-Z]/;

  for (let i = 0; i < str.length - 1; i++) {
    if (regexp.test(str[i]) && regexp.test(str[i + 1])) {
      arr.push(str[i] + str[i + 1]);
    }
  }

  return arr;
}

function solution(str1, str2) {
  var answer = 0;

  const str1Arr = getMultiArr(str1.toUpperCase());
  const str2Arr = getMultiArr(str2.toUpperCase());

  let interArr = [];
  let unionArr = str2Arr.slice();
  let temp = str2Arr.slice();

  // map을 활용하여 교집합과 합집합을 만든다.
  str1Arr.map((x) => {
    if (temp.includes(x)) {
      temp.splice(temp.indexOf(x), 1);
      interArr.push(x);
    } else unionArr.push(x);
  });

  let ingerArrLen = interArr.length;
  let unionArrLen = unionArr.length;

  answer = parseInt((ingerArrLen / unionArrLen) * 65536);

  return ingerArrLen + unionArrLen === 0 ? 65536 : answer;
}

// let str1 = 'FRANCE';
// let str2 = 'french';
// let str1 = 'aaaa+bbb';
// let str2 = 'aaa+bbbb';
// let str1 = 'handshake';
// let str2 = 'shake hands';
// let str1 = 'aa1+aa2';
// let str2 = 'AAAA12';
let str1 = 'abc';
let str2 = 'dfg';
let output = solution(str1, str2);
console.log(output);
