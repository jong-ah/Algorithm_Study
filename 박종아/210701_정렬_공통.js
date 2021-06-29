'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/42747

// TODO H-Index 이해하기
/***********************************************************************
      인용된 수 - 논문의 수
      6번 이상 - 1개
      5번 이상 - 2개    
 // ! 3번 ~ 4번 이상 - 3개 (인용된 수 3 === 논문의 수 3)
      1번 ~ 2번 이상 - 4개
      0번 이상 - 5개
***********************************************************************/

// TODO 수도코드
/***********************************************************************
 // ? 1. h를 0으로 선언한다.
 // ? 2. 인용된 논문의 배열 citations은 내림차순한다.  
 // ? 3. h가 인용된 논문 수보다 작으면 while문이 진행한다.
 // ? 4. citations 배열의 첫번째가 H보다 크거나 같을 경우, h++ 한다.
 // citations.shift() === 6은 0(h 기본값)보다 크므로 h === 1이 된다.
 // citations.shift() === 5은 1(h)보다 크므로 h === 2이 된다.
 // H-Index 이해하기에서 나온 인용된 수, 논문의 수와 동일하다.
 // ? 5. citations 배열의 첫번째가 H보다 작을 경우, h 그대로 리턴한다.
 // citations.shift() === 4가 되면 h === 3보다 크므로 3이 리턴된다. 
 // * 오름차순은 h를 citations.length으로 선언하고, while문을 h가 0보다 클 경우, h--빼면서 값을 맞춘다. 
***********************************************************************/

const descending = () => {
  function solution(citations) {
    const N = citations.length;

    citations.sort((a, b) => b - a);
    console.log(citations);

    let h = 0;

    while (h < N) {
      if (h <= citations.shift()) {
        h++;
      } else break;
    }

    return h;
  }

  let citations = [3, 0, 6, 1, 5]; // 3
  // let citations = [6, 6, 6, 6, 6, 1]; // 5
  // let citations = [12, 11, 10, 9, 8, 1]; // 5
  let output = solution(citations);
  console.log(output);
};

descending();

/***********************************************************************/

const ascending = () => {
  function solution(citations) {
    const N = citations.length;

    citations.sort((a, b) => a - b);
    console.log(citations);

    let h = N;

    while (h > 0) {
      if (h > citations.shift()) {
        h--;
      } else break;
    }
    return h;
  }

  let citations = [3, 0, 6, 1, 5]; // 3
  // let citations = [6, 6, 6, 6, 6, 1]; // 5
  // let citations = [12, 11, 10, 9, 8, 1]; // 5
  let output = solution(citations);
  console.log(output);
};

ascending();
