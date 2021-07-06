// https://programmers.co.kr/learn/courses/30/lessons/42842

/******* 풀이 *******
brown = 2 * (x + y) - 4
yellow = (x - 2) * (y - 2)
*******************/

function solution(brown, yellow) {
	let result;
	
	for (let x = 3; x < brown / 2; x++) {
		let y = (brown / 2) - x + 2;
		if (yellow === (x - 2) * (y - 2)) {
			result = [x, y]
			break;
		}
	}

	return result.sort((a, b) => b - a);
}

var brown = 10;
var yellow = 2;
console.log(solution(brown, yellow)) // [4, 3]

var brown = 8;
var yellow = 1;
console.log(solution(brown, yellow)) // [3, 3]

var brown = 24;
var yellow = 24;
console.log(solution(brown, yellow)) // [8, 6]

/******* 테스트 *******
테스트 1 〉	통과 (0.09ms, 30MB)
테스트 2 〉	통과 (0.08ms, 30MB)
테스트 3 〉	통과 (0.18ms, 30.3MB)
테스트 4 〉	통과 (0.08ms, 30.2MB)
테스트 5 〉	통과 (0.08ms, 29.9MB)
테스트 6 〉	통과 (0.13ms, 29.9MB)
테스트 7 〉	통과 (0.16ms, 30.1MB)
테스트 8 〉	통과 (0.19ms, 30MB)
테스트 9 〉	통과 (0.11ms, 30.2MB)
테스트 10 〉	통과 (0.20ms, 30.3MB)
테스트 11 〉	통과 (0.51ms, 30.1MB)
테스트 12 〉	통과 (0.09ms, 30.1MB)
테스트 13 〉	통과 (0.08ms, 30.1MB)
*******************/ 
