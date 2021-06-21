// https://programmers.co.kr/learn/courses/30/lessons/42861
// 문제 설명
// n개의 섬 사이에 다리를 건설하는 비용(costs)이 주어질 때, 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return 하도록 solution을 완성하세요.

// 다리를 여러 번 건너더라도, 도달할 수만 있으면 통행 가능하다고 봅니다. 예를 들어 A 섬과 B 섬 사이에 다리가 있고, B 섬과 C 섬 사이에 다리가 있으면 A 섬과 C 섬은 서로 통행 가능합니다.

// 제한사항

// 섬의 개수 n은 1 이상 100 이하입니다.
// costs의 길이는 ((n-1) * n) / 2이하입니다.
// 임의의 i에 대해, costs[i][0] 와 costs[i] [1]에는 다리가 연결되는 두 섬의 번호가 들어있고, costs[i] [2]에는 이 두 섬을 연결하는 다리를 건설할 때 드는 비용입니다.
// 같은 연결은 두 번 주어지지 않습니다. 또한 순서가 바뀌더라도 같은 연결로 봅니다. 즉 0과 1 사이를 연결하는 비용이 주어졌을 때, 1과 0의 비용이 주어지지 않습니다.
// 모든 섬 사이의 다리 건설 비용이 주어지지 않습니다. 이 경우, 두 섬 사이의 건설이 불가능한 것으로 봅니다.
// 연결할 수 없는 섬은 주어지지 않습니다.

/******* 풀이 *******
0. 크루스칼 알고리즘을 기반으로 한 문제
	0-1. 가장 적은 비용으로 모든 노드를 연결하는 최소 비용 신장 트리를 만드는 알고리즘
	0-2. 최소 비용 신장 트리 : 사이클 발생 X
	0-3. 연결할 수 없는 섬은 주어지지 않으므로 사이클이 생기는 간선들을 제외하고 모두 연결 == 사이클이 생기지 않는 간선 완성
1. 최소 비용으로 연결하기 위해 비용을 기준으로 sort
2. 사이클 확인을 위한 부모 인덱스를 담을 parent 배열 생성 및 초기화
3. 정렬된 costs에 대한 반복문 실행
4. 부모 인덱스가 다르다면(연결하더라도 사이클이 생기지 않는다면)
5. 부모 인덱스 갱신(두 인덱스 중 작은 값을 부모로 결정)
6. 가격 계산
*******************/
'use strict'

function findParent(parent, n) {
	if (parent[n] === n) return n;
	return parent[n] = findParent(parent, parent[n]);		// 부모가 나올 때까지 재귀
}

function unionParent(parent, from, to) {
	from = findParent(parent, from);
	to = findParent(parent, to);
	if (from > to) parent[from] = to;										// 더 낮은 인덱스를 부모 인덱스로 정의
	else parent[to] = from;
}

function isEqualParent(parent, from, to) {
	from = findParent(parent, from);
	to = findParent(parent, to);
	return from === to;
}

function solution(n, costs) {
	let totalCost = 0;
	let parent = [];
	for (let i = 0; i < n; i++) parent[i] = i;					// 부모 인덱스를 자신 인덱스으로 초기화
	
	costs.sort((a, b) => (a[2] - b[2]));								// 비용 기준으로 sort
	
	for (let i = 0; i < costs.length; i++) {
		let [from, to, price] = costs[i];
		if (!isEqualParent(parent, from, to)) {						// 부모가 다르다면
			unionParent(parent, from, to);									// 부모 인덱스 재정의
			totalCost += price;
		}
	}
	return totalCost;
}


var n = 4;
var costs = [[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]];
console.log(solution(n, costs)); // 4
var n = 5;
var costs = [[0, 1, 5], [1, 2, 3], [2, 3, 3], [3, 1, 2], [3, 0, 4], [2, 4, 6], [4, 0, 7]];
console.log(solution(n, costs)); // 15
var n = 5;
var costs = [[0, 1, 1], [3, 4, 1], [1, 2, 2], [2, 3, 4]];
console.log(solution(n, costs)); // 8
var n = 4;
var costs = [[0, 1, 5], [1, 2, 3], [2, 3, 3], [1, 3, 2], [0, 3, 4]];
console.log(solution(n, costs)); // 9
var n = 5;
var costs = [[0, 1, 1], [3, 1, 1], [0, 2, 2], [0, 3, 2], [0, 4, 100]] ;
console.log(solution(n, costs)); //104
var n = 6;
var costs = [[0, 1, 5], [0, 3, 2], [0, 4, 3], [1, 4, 1], [3, 4, 10], [1, 2, 2], [2, 5, 3], [4, 5, 4]];
console.log(solution(n, costs)); // 11
var n = 5;
var costs = [[0, 1, 1], [2, 3, 1], [3, 4, 2], [1, 2, 2], [0, 4, 100]];
console.log(solution(n, costs)); // 6
var n = 5;
var costs = [[0, 1, 1], [0, 4, 5], [2, 4, 1], [2, 3, 1], [3, 4, 1]];
console.log(solution(n, costs)); // 8
var n = 5;
var costs = [[0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 4], [1, 3, 1]];
console.log(solution(n, costs)); // 8