//? 프로그래머스 레벨2 소수찾기

//! Point
    // 순열을 만드는 함수를 이용해 모든 결과값을 배열에 넣어 저장하고 
    // 완전탐색의 방법으로 소수인지 아닌지 판별하는 함수를 이용해서 true인 값만 담은 배열의 길이를 구하는 문제

    // 소수판별함수와 순열을 만드는 함수는 템플릿처럼 만들어서 사용한다. 

    //# Set 객체는 자료형과 관계없이 원시 값과 객체 참조 모두 유일한 값을 저장할 수 있다.
    //# 따라서 new Set(answer)를 하면 중복된 값이 제외되어 새로운 Set 객체로 반환된다 
    // e.g. answer = [1, 2, 3, 4, 4, 4] 였다면, {1, 2, 3, 4}의 형태로 반환

    
const solution = (numbers) => {
    let answer = [];
    
    for(let i=1; i<numbers.length+1;i++){
        getPermutations([...numbers],i).forEach(v => isPrime(parseInt(v)) ? answer.push(parseInt(v)) : answer);
    }
    return [...new Set(answer)].length;
}

// 순열을 만드는 함수
const getPermutations = (arr, selectNum) => {
    const results = [];
    if(selectNum === 1) return arr.map((el) => el); // 1개씩 택할 때, 모든배열 리턴
    
    arr.forEach((fixed, index, origin) => {
        // 해당하는 fixed를 제외한 나머지 배열
        const rest = origin.filter((_, i) => i !== index);
        const permutations = getPermutations(rest, selectNum -1 );
        const attached = permutations.map((permutation) => [fixed, ...permutation].join(''));
        results.push(...attached);
    });

    return results;
};

// 소수인지 아닌지 판별하는 함수
const isPrime = (num) => {
    if (num <= 1) return false
    if (num % 2 === 0 && num !== 2) return false;
    let sqrt = parseInt(Math.sqrt(num));
    for (let divider = 3; divider <= sqrt; divider += 2) {
        if (num % divider === 0) {
            return false;
        }
    }
    return true;
};