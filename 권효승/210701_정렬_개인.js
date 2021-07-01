// https://programmers.co.kr/learn/courses/30/lessons/42746

/******* 풀이 *******
1. 숫자를 연결하기 쉽도록 모든 요소 문자열로 변경
2. 연속된 두 개의 수를 각각 앞 뒤로 연결 했을 때 더 큰 경우에 대해 내림차순 정렬
*******************/

function solution(numbers) {
	let strNumbers = numbers.map(el => String(el));
	strNumbers.sort((a, b) => (b + a) - (a + b));
	return strNumbers[0] == 0 ? '0' : String(strNumbers.join(''));
}

var numbers = [3, 30, 34, 5, 9]
var numbers = [40, 404]
var numbers = [0, 0, 0, 0]

console.log(solution(numbers));