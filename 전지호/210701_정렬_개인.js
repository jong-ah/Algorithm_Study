// function solution(numbers) {

//     //! 수도 코드
//     //? 1. 가장 큰 자릿수대로 나눌예정
//     //? 2. 동일한 자릿수의 숫자가 있다면 뒷자릿수가 큰 순서대로
//     //? 3. 계속 이어붙이면 될듯?

//     let result = [];
//     let digits = [];

//     // 자릿수를 담아둘 2차원 배열 생성
//     for(let i = 0; i < 10; i++) {
//         digits.push([]);
//     }

//     // 자릿수마다의 배열 담아주기
//     for(let i = 0; i < numbers.length; i++) {

//         let idx = 0;

//         if(numbers[i] > 9) {
//             idx = Math.floor(numbers[i] / 10);
//         }

//         digits[idx].push(numbers[i]);
//     }

//     // digit 배열 정렬
//     for(let i = 0; i < digits.length; i++) {
//         digits[i].sort((a, b) => b - a);
//     }

//     return result;
// }

//! 다른 사람 코드
function solution(numbers) {
    //! 먼저 밑의 문장을 풀어보기전에 sort 를 이해해야함
    //! sort 의 a 와 b, b 는 항상 a 의 전 인덱스를 가짐
    //? 1. 첫번째 sort 의 반복부터 보면 a 는 30, b 는 3 을 가짐
    //? 1-1. `330` - `303` 이 된다.
    //? 1-2. 내림차순 정렬이므로, 330 이 되는 부분이 뒤쪽으로 향한다.
    //? 1-3. 현재 정렬 순서 [3, 30, 34, 5, 9] 변함 없음
    //? 2. 두번째 sort 는 a 가 34, b 가 30 이된다.
    //? 2-1. `3034` - `3430` 이 된다.
    //? 2-2. 현재 정렬 순서 [34, 3, 30, 5, 9] 가 된다.
    //? 3. 세번째 sort 의 반복은 a 가 5, b 가 34 가 된다.
    //? 3-1. `345` - `534` 이 된다.
    //? 3-2. 현재 정렬 순서 [5, 34, 3, 30];
    //? 4. 네 번째 sort 의 반복은 a 가 9, b 가 5 가 된다.
    //? 4-1. `59` - '95' 가 된다.
    //? 4-2. 현재 정렬 순서 [9, 5, 34, 3, 30];
    //? 4-3. 그리고 정렬된 배열 상태에서 join 이 되어 string 으로 출력됨

    debugger;

    let answer = numbers.sort((a, b) => `${b}${a}` - `${a}${b}`).join('');
    return answer[0] === '0' ? '0' : answer;
}

//! 입출력 예시
console.log(solution([3, 30, 34, 5, 9]));   //* 결과: "9534330"
console.log(solution([6, 10, 2]));          //* 결과: "6210"