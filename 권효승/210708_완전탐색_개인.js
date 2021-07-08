// https://programmers.co.kr/learn/courses/30/lessons/42839

/******* 풀이 *******
1. 순서를 구분하는 멱집합 함수 생성
2. 멱집합이 완성되면 isPrime에 010과 같은 값을 10으로 인식하도록 숫자값으로 넘김
3. 소수일 경우에만 result 삽입
4. 중복된 값들은 제거하며 그 갯수 반환
*******************/

function isPrime(num, result) {
	if (num < 2) return false;
	for (let i = 2; i <= Math.sqrt(num); i++)
		if (num % i === 0)
			return false;
	result.push(num)
}


function powerSet(arr, tmp, result) {
	if (arr.length > 0) {
		for (let i = 0; i < arr.length; i++) {
			let spliceArr = [...arr];
			spliceArr.splice(i, 1);
			powerSet(spliceArr, tmp + arr[i], result);
		}
	}
	
	if (tmp.length > 0)
		isPrime(Number(tmp), result);
};

function solution(numbers) {
	let result = []
	
	powerSet(numbers.split(''), '', result);
	return [...new Set(result)].length;
}

console.log(solution("011"))

/******* 테스트 *******
테스트 1 〉	통과 (0.20ms, 30.1MB)
테스트 2 〉	통과 (3.24ms, 32.1MB)
테스트 3 〉	통과 (0.13ms, 30MB)
테스트 4 〉	통과 (2.96ms, 32MB)
테스트 5 〉	통과 (9.22ms, 34.4MB)
테스트 6 〉	통과 (0.13ms, 30MB)
테스트 7 〉	통과 (0.23ms, 30.1MB)
테스트 8 〉	통과 (7.30ms, 33.6MB)
테스트 9 〉	통과 (0.16ms, 30.3MB)
테스트 10 〉	통과 (3.29ms, 32MB)
테스트 11 〉	통과 (1.47ms, 32.6MB)
테스트 12 〉	통과 (0.44ms, 30MB)
*******************/ 
