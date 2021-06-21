// https://programmers.co.kr/learn/courses/30/lessons/43162

/****** 풀이 *******
1. 연결에 대한 정보를 하나의 matrix로 통합
2. 방문하지 않았던 모든 정점에 대해 깊이 우선 탐색 실행
	2-1. 현재 방문 지점을 true로 업데이트
	2-2. 해당 노드에 연결된 노드들 중 방문하지 않은 곳에 대해 깊이 우선 탐색 실행
3. 방문한 횟수 count한 뒤 값 반환
*******************/

function dfs(matrix, isVisit, row) {
	isVisit[row] = true;
	for (let i = 0; i < matrix.length; i++)
		if (!isVisit[i] && matrix[row][i] === 1) // 방문하지 않은 곳뜰 중 연결된 노드 탐색
			dfs(matrix, isVisit, i);
}

function solution(n, computers) {
	let count = 0;
	let isVisit = new Array(n).fill(false);
	let matrix = [];
	for (let i = 0; i < n; i++) matrix.push(computers[i]); // 하나의 matrix로 통합

	for (let i = 0; i < n; i++) {
		if (!isVisit[i]) { // 방문하지 않았던 노드일 경우에만 탐색
			dfs(matrix, isVisit, i);
			count++;
		}
	}

	return count;
}

var n = 3;
var computers = [[1, 1, 0], 
								[1, 1, 0], 
								[0, 0, 1]]
console.log(solution(n, computers)); // 2

var n = 3;
var computers = [[1, 1, 0], 
								[1, 1, 1], 
								[0, 1, 1]];
console.log(solution(n, computers)); // 1