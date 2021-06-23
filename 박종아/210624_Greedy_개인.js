// * https://programmers.co.kr/learn/courses/30/lessons/42883?language=javascript

// TODO 수도코드
/***********************************************************************
 1. 최종으로 리턴될 값의 length는 number.length -k이다.
 2. 겉 for문에선 정답의 수만큼 돌린다.
 3. 속 for문에선 큰 수일 경우, max에 할당한다.
 4. 할당된 max는 answer에 더하고, 겉 for문으로 돌아가 max를 0으로 다시 할당한다.
 5. 정답 수만큼 나오면 max는 answer에 반복 더해졌기 때문에 바로 answer을 리턴한다.
 // ? stack을 사용하여 푸는 사람이 많다.
 // ? 'ㄱ'<'ㄴ' 'a'<'b' '1'<'2' 숫자뿐만 아니라 문자도 비교연산자 가능하다.
***********************************************************************/

// ! 참고 풀이방법
/* 
풀이방법은 다양하지만 제 풀이방법 공유하고자 합니다.
TC 3번 기준으로 말씀드릴게요

Greedy 풀이 큰그림 : 앞자리부터 항상 제일 큰 숫자로 형성되어야 함.

입력 : 4177252841
풀이 :
0) k=4 라는건, n = 6 개 뽑는다는 의미.

1) 41772 52741 로 쪼갠다 ( n = 6 -> n = 제일 큰수 1개 + 나머지 5개)
2) 41772 에서 7 뽑음, 뽑은 index = 2, N = 6-1
3) String number = index (뽑은 index + 1 ~ end) : 7252841

1) 725 2741 로 쪼갠다 ( n = 5 -> n = 제일 큰 수 1개 + 나머지 4개)
2) 725 에서 7 뽑음, 뽑은 index = 0, N = 5-1
3) String number = index(뽑은 index + 1 ~ end) : 252841

설명이 도움이 될지는 모르겠으나.. 여기까지입니다.
*/

function solution(number, k) {
  // 정답, (max의) 인덱스를 선언한다.
  let answer = '';
  let idx = 0;

  // k를 뺀 length가 정답의 수이므로 그만큼 for문 돌린다.
  for (let i = 0; i < number.length - k; i++) {
    // (정답에 계속 더해질) 가장 큰 수 선언한다.
    let max = '0';
    // 아래 for문으로 가장 큰수가 확정될 때마다 정답만큼 나올 때까지 for문을 돌린다.
    for (let j = idx; j <= k + i; j++) {
      // 같은 큰 수를 제거하기 위해 max의 인덱스+1인 idx는 제외한다.
      // 범위의 값을 하나씩 확인할때마다 k+1을 추가해서 범위를 늘린다.
      // 9가 가장 큰수이므로 바로 할당한다.
      if (number[j] === '9') {
        max = number[j];
        idx = j + 1;
        break;
        // max의 큰수를 for문 안에서 돌아가며 찾는다.
      } else if (max < number[j]) {
        max = number[j];
        idx = j + 1;
      }
    }
    answer += max;
  }
  return answer;
}

let number = '4177252841';
let k = 4;
let output = solution(number, k);
console.log(output);
