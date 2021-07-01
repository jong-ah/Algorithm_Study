/***** H-Index *****
일단 H-Index 이해해야함

[3, 0, 6, 1, 5] 배열의 총 5편의 논문이 있다.
각각 배열의 원소값은 논문이 인용된 횟수이다.

[3번 인용됨, 0번 인용됨, 6번 인용됨, 1번 인용됨, 5번 인용됨]

H-Index 는 h 의 최댓값이다.
h 번 이상 인용된 논문이 h 편 이상 이다.
입출력 예시에서 return 값은 3이고
3 번 이상 인용된 논문이 3 편 이상.

6번 이상 인용된 논문 = 1편
5번 이상 인용된 논문 = 2편
3번 이상 인용된 논문 = 3편
1번 이상 인용된 논문 = 4편

각각 숫자가 들어간 자리에 h 를 넣어야하고 서로의 h 가 매칭되면 그 것이 h-index 이다.
*****           *****/

//! 수도 코드
//? 1. 먼저 내림차순으로 최대 인용된 논문횟수를 맨 앞으로 정렬함
//? 2. 반복을 돌리며 현재 인덱스 i 보다 arr[i] 의 값이 더 크다면
//? 3. count 를 1회씩 올려줌
//? 4. Test Case [1, 3, 5, 7, 9, 11] = 4 가 나와야함

/* 풀이
    [11, 9, 7, 5, 3, 1] 로 정렬함
    
    h 가 1 이라면
    1 회 이상 인용된 논문이, 6 편 이상이므로 매칭안됨
    
    h 가 2 라면
    2 회 이상, 5 편 이상이므로 매칭안됨
    
    h 가 3 이라면
    3 회 이상, 5 편 이상이므로 매칭안됨
    
    h 가 4 라면
    4 회 이상, 4 편 이상이므로 매칭됨
    따라서 4 가 h-index 이다.
    
    이해하느라 조금 힘들었음.
*/

function solution(citations) {
    let arr = citations.slice();
    arr.sort((a, b) => b - a);

    let result = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > i)
            result++;
    }

    return result;
}