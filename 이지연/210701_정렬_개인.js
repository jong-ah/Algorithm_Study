//? 프로그래머스 레벨2 가장 큰 수

    //= Test Case [3, 30, 34, 5, 9], "9534330"
    //= Test Case [0, 0, 0], "0"

    //! point
    // 단순히 sort 메소드를 사용해서 내림차순으로 정렬해서 이어붙이면 원하는 결과값을 얻을 수 없다.
    // 3과 30을 비교했을 때 3이 더 작으므로 [30, 3]으로 반환되는데, 
    // 두 수를 이어붙인 결과값을 비교하면 303 < 330이 더 크므로 
    // [3, 30]으로 정렬하고 연결해야만 한다.
    // 이러한 경우의 수를 모두 고려해야하므로, 아래와 같은 방법으로 비교정렬을 한다. 

    // 숫자를 문자열로 바꾸고
        //# 왜 문자열로 바꾸어야하지? => 문자열을 더하면 두 문자열이 연결이 되어서 반환
        // e.g. a+b = ab
    // sort메소드로 비교정렬을 하는데, compareFunction(a, b)에서 
    // ba와 ab의 차를 구했을 때,
    // 1. ba - ab > 0 이면 b가 a보다 작은 인덱스로 정렬된다.
    // 2. ba - ab < 0 이면 a가 b보다 작은 인덱스로 정렬된다.
    // 정렬한 배열을 join 메소드로 이어붙이고 결과값을 반환하는데 
    // numbers가 0으로만 이루어진 배열 즉, [0, 0, 0]일 때(아마도 테스트케이스 11)는 결과값이 '000'이 된다. 이 경우 원하는 결과값은 '0'이므로 결과값의 첫번째 수가 0이면 '0'으로 반환되도록 조건을 붙여준다.  


    function solution(numbers) {

        let answer = ''
    
        let strArr = numbers.map(el => String(el))
        strArr.sort((a,b) => Number(b+a) - Number(a+b))
    
        answer = strArr.join('')
    
        return answer.slice(0,1) === '0'? '0' : answer 
    }



//! arr.sort() [mdn참고]
//* 구문: arr.sort([compareFunction])
//# compareFunction(Optional)
    // 정렬 순서를 정의하는 함수. 생략하면 배열은 각 요소의 문자열 변환에 따라 각 문자의 유니 코드 코드 포인트 값에 따라 정렬
    // compareFunction(a, b)이 0보다 작은 경우 a를 b보다 낮은 색인으로 정렬합니다. 
    // compareFunction(a, b)이 0을 반환하면 a와 b를 서로에 대해 변경하지 않고 모든 다른 요소에 대해 정렬합니다.
    // compareFunction(a, b)이 0보다 큰 경우, b를 a보다 낮은 인덱스로 소트합니다. 



//? 프로그래머스 1단계 K번째 수

function solution(array, commands) {
    var answer = [];
    
    commands.forEach((el) => {
        let k = el[2]-1
        let sort = array.slice(el[0]-1, el[1]).sort((a,b) => a-b)
        answer.push(sort[k])
    })
    
    return answer;
}