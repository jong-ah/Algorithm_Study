// https://programmers.co.kr/learn/courses/30/lessons/42747


/******* 풀이 *******
0. 'h번 이상 인용 된 것이 h개 이상이 존재'라는 조건을 만족하는 h 중 최댓값을 찾는 문제
1. 최댓값을 찾아야되니 인용된 횟수를 내림차순으로 정렬
2. 인용된 횟수가 현재 h + 1 보다 크다면(==h번 이상 인용 된 것) h를 1 증가
3. 조건을 만족하지 않을 경우 반복문을 탈출(==최댓값)
*******************/

function solution(citations) {
	citations.sort((a, b) => b - a)
	let h = 0;

	for (let i = 0; i < citations.length; i++) {
		if (h + 1 <= citations[i]) h++;
		else break;
	}

	return h;
}


// 한 줄 코딩
function solution(citations) {
	return citations.sort((a, b) => b - a).reduce((count, el, idx) => { return idx + 1 <= el ? count + 1 : count; }, 0);
}

var citations = [3, 0, 6, 1, 5]
console.log(solution(citations));