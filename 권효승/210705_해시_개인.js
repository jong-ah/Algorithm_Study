// https://programmers.co.kr/learn/courses/30/lessons/42578

/******* 풀이 *******
옷을 입는 부위별로 나눈 뒤
((한 부위의 옷 종류 수 + 1) * (그 다음 부위 옷 종류 수 + 1) * ...) - 1)
으로 계산
*******************/

function getMap(clothes) {
	let map = new Map();
	for (let i = 0; i < clothes.length; i++) {
		if (!map.has(clothes[i][1]))
			map.set(clothes[i][1], [clothes[i][0]])
		else
			map.set(clothes[i][1], [...map.get(clothes[i][1]), clothes[i][0]])
	}
	return map;
}

function solution(clothes) {
	let result = 1;
	let clothesMap = getMap(clothes);
	for (let [key, value] of clothesMap)
		result *= value.length + 1;
	return result - 1;
}

var clothes = [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]];
console.log(solution(clothes));

/******* 테스트 *******
테스트 1 〉	통과 (0.17ms, 29.9MB)
테스트 2 〉	통과 (0.10ms, 29.6MB)
테스트 3 〉	통과 (0.16ms, 29.8MB)
테스트 4 〉	통과 (0.17ms, 30MB)
테스트 5 〉	통과 (0.16ms, 29.9MB)
테스트 6 〉	통과 (0.15ms, 29.8MB)
테스트 7 〉	통과 (0.17ms, 30MB)
테스트 8 〉	통과 (0.11ms, 29.9MB)
테스트 9 〉	통과 (0.09ms, 30MB)
테스트 10 〉	통과 (0.12ms, 30.1MB)
테스트 11 〉	통과 (0.12ms, 29.9MB)
테스트 12 〉	통과 (0.16ms, 30MB)
테스트 13 〉	통과 (0.16ms, 30MB)
테스트 14 〉	통과 (0.12ms, 30MB)
테스트 15 〉	통과 (0.12ms, 30.1MB)
테스트 16 〉	통과 (0.12ms, 29.7MB)
테스트 17 〉	통과 (0.10ms, 29.7MB)
테스트 18 〉	통과 (0.15ms, 29.9MB)
테스트 19 〉	통과 (0.15ms, 30MB)
테스트 20 〉	통과 (0.14ms, 30MB)
테스트 21 〉	통과 (0.12ms, 30MB)
테스트 22 〉	통과 (0.14ms, 30.1MB)
테스트 23 〉	통과 (0.15ms, 29.9MB)
테스트 24 〉	통과 (0.15ms, 29.9MB)
테스트 25 〉	통과 (0.16ms, 30.2MB)
테스트 26 〉	통과 (0.16ms, 29.9MB)
테스트 27 〉	통과 (0.12ms, 30.2MB)
테스트 28 〉	통과 (0.16ms, 30MB)
*******************/ 
