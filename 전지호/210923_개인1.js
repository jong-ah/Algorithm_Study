//! 문제 설명
/*
    JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다.
    문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.
*/

//! 제한 사항
//? 1. s는 길이 1 이상인 문자열입니다.
//? 2. s는 알파벳과 공백문자(" ")로 이루어져 있습니다.
//? 3. 첫 문자가 영문이 아닐때에는 이어지는 영문은 소문자로 씁니다. ( 첫번째 입출력 예 참고 )

function solution(s) {
  //? 1. 문제 이해
  /*
    음.. 일단 문제를 풀긴 풀었는데 공백이 한 개가 아닌 여러개의 공백으로 이어질 수 있다.
    그리고 그 공백을 하나로 줄이는 것이 아니라 그냥 다시 같은 갯수대로 합쳐주면 된다.
    첫 번째 문자열이 숫자가 아니라면 대문자로 만들어주면 되었고, 받아오는 s 가 꼭 무조건 모두 소문자가 아니기도 했다.
    다른건 다 괜찮은데.. 제발 공백 문자가 하나가 아니라는 것좀 표기해주었으면 좋겠다.
  */

  //? 2. 시간복잡도
  //* 일단 for 문이 한 번 돌아서 O(n) 인건 알겠는데 그 안에서 또 돌아가는 toUpperCase 와 slice 의 시간복잡도에
  //* 따라서 O(n * slice() or toUpperCase()) 가 될 것이다. ( 검색 했으나 나오지 않음 )

  //? 3. 개선점
  //* 다른 사람의 코드를 보았을때 대부분의 사람들이 다 비슷하게 풀었다. 시간 복잡도나 이런 방면에서 보았을때
  //* 개선할점은 딱히 없어 보인다.

  s = s.toLowerCase();
  let arr = s.split(" ");
  let regExp = /[a-z]/;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "" && regExp.test(arr[i][0])) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
  }

  return arr.join(" ");
}

//! 입출력 예시
console.log(solution("3people unFollowed me")); //* 결과: "3people Unfollowed Me"
console.log(solution("for the last week")); //* 결과: "For The Last Week"
