// https://programmers.co.kr/learn/courses/30/lessons/42579

/******* 풀이 *******
1. genres를 키 값으로 가진 Map 객체 생성
	1-1. 결과 출력에 인덱스가 필요하므로 인덱스를 포함하여 삽입
2. 총 합이 높은 장르부터 결과에 담아야하므로 장르별 총합을 가진 배열 생성 후 내림차순 정렬
3. 그 중 1, 2등만 삽입해야하므로 각 키 값별로 내림차순 정렬
4. 장르별로 총합이 내림차순으로 정렬된 배열에 대한 반복문 실행
	4-1. 해당 키 값 조회 후 첫 번째 요소의 인덱스 삽입
	4-2. 키 값의 요소가 두 개 이상일 때만 두 번째 요소 삽입
*******************/


'use strict'

const arrGenreTotal = [];

function sortMapElements(value) {
	value.sort((a, b) => b[0] - a[0]);
}

function getMapElementsSum(value) {
	return value.reduce((sum, el) => sum + el[0], 0)
}

function getMapKeyEachTotal(value, key) {
	arrGenreTotal.push([getMapElementsSum(value), key])
}

function getMap(genres, plays) {
	let map = new Map();
	for (let i = 0; i < genres.length; i++) {
		if (!map.has(genres[i]))
			map.set(genres[i], [[plays[i], i]])
		else
			map.set(genres[i], [...map.get(genres[i]), [plays[i], i]])
	}
	return map;
}

function solution(genres, plays) {
	let albumMap = getMap(genres, plays);
	let result = [];

	albumMap.forEach(getMapKeyEachTotal);	// 각 키 값 총 합
	albumMap.forEach(sortMapElements);		// 각 키 값 내림차순 정렬
	arrGenreTotal.sort((a, b) => b[0] - a[0]);
	for (let i = 0; i < arrGenreTotal.length; i++) {		// 장르별로 총합이 내림차순으로 정렬된 배열에 대해 반복문 실행
		result.push(albumMap.get(arrGenreTotal[i][1])[0][1]);
		if (albumMap.get(arrGenreTotal[i][1]).length > 1)	// 두 개 이상일 때만 두 번째 요소 삽입
			result.push(albumMap.get(arrGenreTotal[i][1])[1][1]);
	}
	return result;
}

var genres = ["classic", "pop", "classic", "classic", "pop"];
var	plays = [500, 600, 150, 800, 2500];

console.log(solution(genres, plays)); // [4, 1, 3, 0]

/******* 테스트 *******
테스트 1 〉	통과 (0.22ms, 30.1MB)
테스트 2 〉	통과 (0.22ms, 30.1MB)
테스트 3 〉	통과 (0.14ms, 29.9MB)
테스트 4 〉	통과 (0.13ms, 30MB)
테스트 5 〉	통과 (0.42ms, 30.1MB)
테스트 6 〉	통과 (0.23ms, 30.2MB)
테스트 7 〉	통과 (0.20ms, 30.1MB)
테스트 8 〉	통과 (0.29ms, 29.5MB)
테스트 9 〉	통과 (0.22ms, 30MB)
테스트 10 〉	통과 (0.36ms, 30MB)
테스트 11 〉	통과 (0.23ms, 30MB)
테스트 12 〉	통과 (0.30ms, 30MB)
테스트 13 〉	통과 (0.34ms, 30.2MB)
테스트 14 〉	통과 (0.23ms, 30.1MB)
테스트 15 〉	통과 (0.22ms, 30MB)
*******************/
