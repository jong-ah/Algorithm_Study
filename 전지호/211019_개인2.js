//! 문제 설명
/*
    네오와 프로도가 숫자놀이를 하고 있습니다. 
    네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.
    
    다음은 숫자의 일부 자릿수를 영단어로 바꾸는 예시입니다.
    1478 → "one4seveneight"
    234567 → "23four5six7"
    10203 → "1zerotwozero3"

    이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 
    혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다. 
    s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.
*/

//! 제한 사항
//? 1. 1 ≤ s의 길이 ≤ 50
//? 2. s가 "zero" 또는 "0"으로 시작하는 경우는 주어지지 않습니다.
//? 3. return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 s로 주어집니다.

function solution(s) {
  //? 1. 문제 이해
  /*
    음 그냥.. replace 난사해서 풀었다.
    정규식을 사용하긴 했다.
  */

  //? 2. 시간 복잡도
  //* replace 가 쭉쭉 이어서 간다. O(n) 이다.

  //? 3. 개선점
  //* 다른 사람의 코드를 보았을때도 O(n) 이 대부분이었다. 그래서 개선점은 없어보인다.

  s = s
    .replace(/zero/g, 0)
    .replace(/one/g, 1)
    .replace(/two/g, 2)
    .replace(/three/g, 3)
    .replace(/four/g, 4)
    .replace(/five/g, 5)
    .replace(/six/g, 6)
    .replace(/seven/g, 7)
    .replace(/eight/g, 8)
    .replace(/nine/g, 9);

  return Number(s);
}

//! 입출력 예시
console.log(solution("one4seveneight")); //* 결과: 1478
console.log(solution("23four5six7")); //* 결과: 234567
console.log(solution("2three45sixseven")); //* 결과: 234567
console.log(solution("123")); //* 결과: 123
