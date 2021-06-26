//? 프로그래머스 레벨2 구명보트
//! 코플릿 15번과 완전 똑같은 풀이지만 복습차원에서 다시 풀어봄


// 입출력예시 people = [70, 50, 80, 50], limit = 100 

function solution(people, limit) {

    // 최종적으로 절약할 수 있는 보트의 숫자를 누적해서 저장 할 수 있도록 변수를 선언하고 0을 할당
    var savings = 0;
    // 사람들의 몸무게에 따라 배열을 정렬하고
    people.sort((a, b) => a-b);
    
    // 가장 작은 인덱스와 큰 인덱스를 할당한 변수를 만들어 놓고
    let left = 0;
    let right = people.length-1;
    
    // 조건: 작은인덱스가 큰인덱스를 역전하기 전까지 반복
    while(left < right) {
        if(people[left] + people[right] <= limit) { 
            // 만약 몸무게가 가장 적은 사람과 큰사람을 한번에 태울수 있다면 보트를 한 대 줄일 수 있다.  
            right-- 
            left++
            savings++
        } else { // 조건을 만족하지 않으면 보트를 줄일 수 없으므로 두번째로 무거운 사람과 비교할 수 있도록 인덱스 감소
            right--
        }
    }

    return people.length - savings; // 총 사람의 인원수에서 최종적으로 줄어든 보트의 값을 빼고 리턴한다. 
}



//? 프로그래머스 레벨2 큰 수 만들기

function solution(number, k) {

    //! Point
    //* 이 문제에서는 결과값을 얻기 위한 수를 선택하면 선택한 숫자앞에 아무리 큰 수가 있어도 다시 선택할 수가 없다.
    //* 선택한 숫자 이후에 충분한 숫자의 갯수가 없으면 number 중에 가장 큰 숫자일지라도 선택할 수 없다.



    // 문자형식으로 들어온 number를 배열로 변환하고 각 요소를 숫자로 변환
    let arr = number.split("").map(el => Number(el));
    // 결과를 담을 배열을 만들고
    let answer = [];
    let answerLen = arr.length - k;  // 결과값의 길이(인자로 주어지는 값인 k는 제거되어야하는 것의 갯수)
    let i = 0;
    while (answerLen > 0) { // 반복문을 돌릴때마다 answer배열에 max값을 push하고 answerLen은 하나씩 줄어든다. answer의 자릿수가 조건을 만족하면 반복이 종료. 
        
        let max = -1;       // 각 숫자는 음수가 될 수 없으므로 초기값을 음수로 넣고 비교를 시작
        let maxIdx = -1;    // 마찬가지로 인덱스는 0부터 시작하므로 초기값에 -1을 넣고 각 요소와 비교 시작
        
        for (let j = i; j < arr.length-answerLen + 1; j++) {
            if (arr[j] > max) {
                max = arr[j];
                maxIdx = j;
            }
        }
        //! greedy는 선택한 이후를 돌아보지 않는다. 
        // 따라서 max가 되어 이미 answer에 들어간 인덱스를 포함한 이전은 살펴볼 필요가 없으므로 maxIdx이후부터 반복문을 돌리기 위해서 i값에 새로운 시작 인덱스를 준다.  
        i = maxIdx+1;  
        answer.push(max);   // 조건에 만족하는 값을 배열에 넣고
        answerLen--;        // while문 조건이 종료되기 위해서는 각 과정이 끝나면 answerLen이 하나 감소해야함
    }
    return answer.join("");  // answer은 배열이므로 join으로 하나의 문자열 형식으로 반환해야함. 
}

