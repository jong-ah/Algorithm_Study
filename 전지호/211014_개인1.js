//! 문제 설명
/*
    자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.
    
    조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
    조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
    조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.

    예를 들어서 78(1001110)의 다음 큰 숫자는 83(1010011)입니다.
    자연수 n이 매개변수로 주어질 때, n의 다음 큰 숫자를 return 하는 solution 함수를 완성해주세요.
*/

//! 제한 사항
//? 1. n은 1,000,000 이하의 자연수 입니다.

function solution(n) {
  //? 1. 문제 이해
  /*
    먼저 원본 n 의 1 의 길이를 구해놓는다.
    그리고 while 문을 계속 돌리며 n 에 1 을 더해준다.
    계속해서 1씩 증가된 n 의 1 의 길이를 구한다.

    원본 n 의 1 의 길이와 더해가며 증가된 n 의 1 의 길이가 같다면
    다음 큰 수 n 이 된다.
  */

  //? 2. 시간복잡도
  //* toString 과 match 의 시간복잡도가 둘 다 나와있지 않았다 ㅜㅜ
  //* 어쨌든 while 을 돌리고 있어서 O(n) 은 확실하고 둘 중에 높은 것이 n 에 곱해질 것으로 보인다.

  //? 3. 개선점
  //* 재귀를 사용해서 푸는 방법이 있었고, while 문을 이용해 푸는 사람들이 많았다.
  //* 그래서 시간복잡도에서의 개선점은 딱히 없어보인다.
  let num = Number(n).toString(2);
  let numCount = num.match(/1/g).length;

  while (true) {
    n += 1;
    let next = Number(n).toString(2);
    let nextCount = next.match(/1/g).length;

    if (numCount === nextCount) {
      break;
    }
  }

  return n;
}

//! 입출력 예시
console.log(solution(78)); //* 결과: 83
console.log(solution(15)); //* 결과: 23
