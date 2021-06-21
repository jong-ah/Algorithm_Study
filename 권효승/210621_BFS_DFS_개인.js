// https://programmers.co.kr/learn/courses/30/lessons/43164

/****** 풀이 *******
1. 알파벳 순서가 앞서는 경로를 찾아야하므로 tickets 배열을 오름차순으로 정렬
2. tickets, 방문 경로, 현재 위치, 방문해야하는 경로 수, 티켓 사용 여부를 넣어 재귀
3. 다 방문했다면 `answer`에 방문 경로를 집어 넣으면서 함수를 종료
4. 티켓에 대해 반복문을 돌리면서 갈 수 있는 다음 경로 탐색
5. 티켓 사용 여부를 true로 업데이트 한 뒤 다음 경로에 대한 재귀
6. 3~5번 과정 반복
	6-1. 티켓을 사용하는 도중 다음 경로에 갈 수 없어 실패한다면 티켓 사용 여부를 다시 false로 초기화하면서 다시 다음 경로 티켓에 대해 탐색
	6-2. 모든 티켓에 대해 실패한다면 상위 재귀함수로 돌아와 다른 값을 넣으면서 다시 시도
7. 정답을 찾았을 경우 연쇄적으로 `return true`를 하게 되며 함수 종료
*******************/
'use strict';

let answer = [];

function getPath(tickets, visitPath, currLocation, n, isUseTicket) {
	if (visitPath.length === n) {
		answer = visitPath;
		return true; // 원하는 답을 찾았으니 함수 종료
	}

	// 티켓 탐색
	for (let i = 0; i < tickets.length; i++) {
		let nextLocation = tickets[i][1];
		if (!isUseTicket[i] && tickets[i][0] === currLocation) { // 사용하지 않은 티켓들 중에 출발지가 현재 위치일 때
			isUseTicket[i] = true; // 사용했다고 표시
			// 정답을 찾았을 경우	: true
			// 찾지 못 했을 경우	: false
			// 정답을 찾았을 경우 if문이 성립이 되면서 연쇄적으로 true가 리턴되면서 모든 재귀 함수가 바로 종료
			if (getPath(tickets, [...visitPath, nextLocation], nextLocation, n, isUseTicket)) return true;
			isUseTicket[i] = false; // 찾는데 실패하였으니 다시 원상 복구
		}
	}
	return false;
}

function solution(tickets) {
	let visitPath = ["ICN"]
	let isUseTicket = new Array(tickets.length).fill(false);
	getPath(tickets.sort(), visitPath, "ICN", tickets.length + 1, isUseTicket); // abc순으로 티켓을 사용해야하므로 sort();
	return answer;
}

console.log(solution([["ICN", "JFK"], ['HND', 'IAD'], ['JFK', 'HND']]), "==",['ICN', 'JFK', 'HND', 'IAD'])
console.log(solution([['ICN', 'SFO'], ['ICN', 'ATL'], ['SFO', 'ATL'], ['ATL', 'ICN'], [ 'ATL', 'SFO']]), "==",['ICN', 'ATL', 'ICN', 'SFO', 'ATL', 'SFO'])
console.log(solution([['ICN', 'B'], ['B', 'ICN'], ['ICN', 'A'], [ 'A', 'D'], ['D', 'A']]), "==",['ICN', 'B', 'ICN', 'A', 'D', 'A'])
console.log(solution([['ICN', 'SFO'], ['SFO', 'ICN'], ['ICN', 'SFO'],['SFO', 'JFK']]), "==",['ICN', 'SFO', 'ICN', 'SFO', 'JFK'])
console.log(solution([['ICN', 'A'], ['ICN', 'A'], ['A', 'ICN'],['A', 'C']]), "==",['ICN', 'A', 'ICN', 'A', 'C'])
console.log(solution([['ICN', 'A'], ['A', 'ICN'], ['A', 'B'],['ICN', 'A']]), "==",['ICN', 'A', 'ICN', 'A', 'B'])
console.log(solution([['ICN', 'BBB'], ['AAA', 'ICN'], ['ICN', 'AAA']]),"==",['ICN', 'AAA', 'ICN', 'BBB'])
console.log(solution([['ICN', 'ABB'], ['AAA', 'ICN'], ['ICN', 'AAA'], ['ICN', 'ADD'], [ 'ABB', 'ICN']]), "==",['ICN', 'AAA', 'ICN', 'ABB', 'ICN', 'ADD'])
console.log(solution([['ICN', 'AAA'], ['ICN', 'AAA'], ['AAA', 'ICN'],['AAA', 'CCC']]), "==",['ICN', 'AAA', 'ICN', 'AAA', 'CCC'])
console.log(solution([['ICN', 'AAA'], ['ICN', 'AAA'], ['ICN', 'AAA'],['AAA', 'ICN'], ['AAA', 'ICN']]), "==", ['ICN', 'AAA', 'ICN', 'AAA', 'ICN', 'AAA'])
console.log(solution([['ICN', 'A'], ['ICN', 'B'], ['B', 'ICN']]),"==", ['ICN', 'B', 'ICN', 'A'])
console.log(solution([['ICN', 'A'], ['A', 'C'], ['ICN', 'B'], ['B', 'ICN']]),"==", ['ICN', 'B', 'ICN', 'A', 'C'])
console.log(solution([['ICN', 'BOO'], ['ICN', 'COO'], ['COO', 'DOO'], ['DOO', 'COO'], ['BOO', 'DOO'], ['DOO', 'BOO'], ['BOO', 'ICN'], ['COO', 'BOO']]), "==", ['ICN', 'BOO', 'DOO', 'BOO', 'ICN', 'COO', 'DOO', 'COO', 'BOO'])