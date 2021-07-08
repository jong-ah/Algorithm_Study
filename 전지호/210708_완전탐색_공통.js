//! 규칙성
/*
    1. sum = brown + yellow = width * height 와 같다
    2. brown 은 yellow 보다 크거나 같다
    3. 중앙에 들어가는 yellow 는 (w - 2) * (h - 2) 가 된다.
    3-1. brown 은 (w * h) - yellow 가 된다.
    
    그럼 완전탐색을 돌려서
    yellow 가 (w - 2) * (h - 2) 와 같고
    brown 이 (w * h) - yellow 가 같을때까지 반복을 돌릴까?
    반복의 제한을 어디까지 걸어야할까?
    
    조건! w와 h 는 무조건 3 이상이어야 한다.
*/

function solution(brown, yellow) {
    let result = [];

    let i = 3;

    while (result.length < 2) {

        for (let j = 3; j < brown; j++) {
            if (yellow === (i - 2) * (j - 2) && brown === (i * j) - yellow) {
                result.push(j, i);
            }
        }

        i++;
    }

    return result;
}