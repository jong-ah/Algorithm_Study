//! 문제 설명
/*
    괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다.
    예를 들어 "()()" 또는 "(())()" 는 올바른 괄호입니다. ")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
    '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 
    올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.
*/

//! 제한 사항
//? 1. 문자열 s의 길이 : 100,000 이하의 자연수
//? 2. 문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

function solution(s) {
  //? 1. 문제 이해
  /*
    먼저 s 를 split 해서 arr 배열에 하나씩 나누어 넣어줬다.
    그리고 left 라는 변수를 선언하고 arr 의 맨 처음 요소가 ")" 라면 바로 false 를 return
    다음에 반복을 돌려서 "(" 가 나오면 left++ 을 해주고
    만약 left 가 1 이상, arr[i] 가 ")" 라면 left 를 -- 해주었다.
    반복을 모두 돌리고 나서 left 가 0 이라면 return true, 아니라면 false
  */

  //? 2. 시간 복잡도
  //* arr 의 반복이 O(n) 으로 제일 큰 시간복잡도이므로 O(n) 이다.

  //? 3. 개선점
  //* 다른 사람의 코드를 보았을때 for 문이 한 번씩 나왔기 때문에 O(n) 이 대부분이었다.
  //* 시간복잡도 상으로 개선할 점이 없어 보인다.
  let arr = s.split("");
  let left = 0;

  if (arr[0] === ")") {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      left++;
    } else if (left >= 1 && arr[i] === ")") {
      left--;
    }
  }

  if (left === 0) {
    return true;
  } else {
    return false;
  }
}

//! 입출력 예시
console.log(solution("()()")); //* 결과: true
console.log(solution("(())()")); //* 결과: true
console.log(solution(")()(")); //* 결과: false
console.log(solution("(()(")); //* 결과: false
