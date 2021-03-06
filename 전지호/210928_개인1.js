//! 문제 설명
/*
    짝지어 제거하기는, 알파벳 소문자로 이루어진 문자열을 가지고 시작합니다.
    먼저 문자열에서 같은 알파벳이 2개 붙어 있는 짝을 찾습니다.
    그다음, 그 둘을 제거한 뒤, 앞뒤로 문자열을 이어 붙입니다.
    이 과정을 반복해서 문자열을 모두 제거한다면 짝지어 제거하기가 종료됩니다. 
    문자열 S가 주어졌을 때, 짝지어 제거하기를 성공적으로 수행할 수 있는지 반환하는 함수를 완성해 주세요. 
    성공적으로 수행할 수 있으면 1을, 아닐 경우 0을 리턴해주면 됩니다.

    예를 들어, 문자열 S = baabaa 라면

    b aa baa → bb aa → aa →
    의 순서로 문자열을 모두 제거할 수 있으므로 1을 반환합니다.
*/

//! 제한 사항
//? 1. 문자열의 길이 : 1,000,000이하의 자연수
//? 2. 문자열은 모두 소문자로 이루어져 있습니다.

function solution(s) {
  //? 1. 문제이해
  /*
    단순히 같이 이어져있는 문자열이 있는지에 대해 검사하는 문제였다.
    만약 같은 문자가 이어지면 두 문자는 사라져야한다.
    마지막에 지워지지 않은 문자가 있다면 0 을 return, 문자가 모두 지워져 비워졌다면 1 을 return
  */

  //? 2.시간 복잡도
  //* for 문 안에서 배열의 마지막 요소와 비교해서 값이 같으면 pop(), 아니라면 push 를 해주었다.
  //* for 문 안에서 pop 과 push 의 시간복잡도는 O(1) 그래서 O(n * 1) 로 시간복잡도가 이루어진다.

  //? 3. 개선점
  //* 처음에는 while 문을 사용하여 i 인덱스로 배열의 전과 후의 값을 비교하며 진행하였다가 효율성에서 실패해서
  //* 배열에 저장하면서 pop() 과 push() 를 통해 해주도록 개선해주었다.
  //* 효율성에 정상적으로 통과했고 다른 사람들의 코드를 비교해도 다 비슷하게 풀어서 개선점은 없어보인다.

  const arr = [];

  for (let i = 0; i < s.length; i++) {
    if (arr[arr.length - 1] === s[i]) {
      arr.pop();
    } else {
      arr.push(s[i]);
    }
  }

  return arr.length === 0 ? 1 : 0;
}

//! 입출력 예시
console.log(solution("baabaa")); //* 결과: 1
console.log(solution("cdcd")); //* 결과: 0
