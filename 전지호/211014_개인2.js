//! 문제 설명
/*
  https://programmers.co.kr/learn/courses/30/lessons/17677

  너무 길다.. 카카오 문제라서 그런듯..
*/

//! 제한 사항
//? 1. 입력으로는 str1과 str2의 두 문자열이 들어온다. 각 문자열의 길이는 2 이상, 1,000 이하이다.
//? 2. 입력으로 들어온 문자열은 두 글자씩 끊어서 다중집합의 원소로 만든다.
//? 2. 이때 영문자로 된 글자 쌍만 유효하고, 기타 공백이나 숫자, 특수 문자가 들어있는 경우는 그 글자 쌍을 버린다.
//? 2. 예를 들어 "ab+"가 입력으로 들어오면, "ab"만 다중집합의 원소로 삼고, "b+"는 버린다.
//? 3.다중집합 원소 사이를 비교할 때, 대문자와 소문자의 차이는 무시한다. "AB"와 "Ab", "ab"는 같은 원소로 취급한다.
//? 4. 다중집합 원소 사이를 비교할 때, 대문자와 소문자의 차이는 무시한다. "AB"와 "Ab", "ab"는 같은 원소로 취급한다.

function solution(str1, str2) {
  //? 1. 문제 이해
  /*
    먼저 문자열을 2개씩 나누어서 배열에 넣어주었다.
    넣어줄때는 공백, 특수문자, 숫자를 제외해야하기 때문에 정규식을 이용하였다.
    그 다음에는 합집합, 교집합을 구해줘서 나와있는 공식대로 계산해서 return 해주면 끝이다.
  */

  //? 2. 시간 복잡도
  //* O(n^3) 으로 보인다. for 문이 서로 겹쳐있지 않고 for 문 안에 indexOf가 그나마 O(n) 이라서
  //* for 문 안에 splice 안에 indexOf 가 3 번 겹쳐서 O(n^3) 으로 보인다.

  //? 3. 개선점
  //* 합집합, 교집합을 구해주는 부분에서 set 메소드를 이용했으면 어떨까 생각이 들긴한다.
  //* 다른 사람 코드에서 set 을 사용해서 O(n^2) 으로만 해결한 것 같아서 좋아보인다.

  let arr1 = [];
  let arr2 = [];

  let regex = /[a-z]/;

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  for (let i = 0; i < str1.length - 1; i++) {
    if (regex.test(str1[i]) && regex.test(str1[i + 1])) {
      arr1.push(str1[i] + str1[i + 1]);
    }
  }

  for (let i = 0; i < str2.length - 1; i++) {
    if (regex.test(str2[i]) && regex.test(str2[i + 1])) {
      arr2.push(str2[i] + str2[i + 1]);
    }
  }

  let union = [];
  let intersect = [];

  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) >= 0) {
      intersect.push(arr1.splice(arr1.indexOf(arr2[i]), 1));
    }

    union.push(arr2[i]);
  }

  for (let i = 0; i < arr1.length; i++) {
    union.push(arr1[i]);
  }

  return union.length === 0
    ? 65536
    : Math.floor((intersect.length / union.length) * 65536);
}

//! 입출력 예시
console.log(solution("FRANCE", "french")); //* 결과: 16384
console.log(solution("handshake", "shake hands	")); //* 결과: 65536
console.log(solution("aa1+aa2	", "AAAA12")); //* 결과: 43690
console.log(solution("E=M*C^2	", "e=m*c^2	")); //* 결과: 65536
