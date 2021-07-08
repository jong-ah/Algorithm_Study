function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;

    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }

    return true;
}

// 순열을 구하는 함수
function permutation(arr, selectNum) {
    let result = [];
    if (selectNum === 1) return arr.map((v) => [v]);

    arr.forEach((v, idx, arr) => {
        const fixer = v;
        const restArr = arr.filter((_, index) => index !== idx);
        const permuationArr = permutation(restArr, selectNum - 1);
        const combineFixer = permuationArr.map((v) => fixer + v);

        result.push(...combineFixer);
    });

    return result;
}

function solution(numbers) {
    // 종이 조각이 흩어져있음 
    // 종이 조각을 붙여 소수 몇 개 만들 수 있는지 알아야함
    // 숫자가 적힌 문자열 numbers
    // 각 조각으로 만들 수 있는 소수가 몇 개일까?

    let count = 0;
    let arr = numbers.split('');
    let temp = [];

    // 배열로 return 이 되서 flat 으로 쪼개주고 spread 문법까지 사용해줌
    for (let i = 1; i <= arr.length; i++) {
        temp.push(...permutation(arr, i).flat());
    }

    // 중복된 원소를 제거하기위한 Set 사용
    let set = new Set();
    for (let i = 0; i < temp.length; i++) {
        set.add(Number(temp[i]));
    }
    temp = [...set];

    for (let i = 0; i < temp.length; i++) {
        if (isPrime(temp[i])) {
            count++;
        }
    }

    return count;
}