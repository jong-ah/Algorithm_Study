// https://programmers.co.kr/learn/courses/30/lessons/42860

/***********************************************************************
1. 조이스틱으로 알파벳을 옮겨야할 인덱스가 담긴 배열 생성
2. 담긴 배열이 0이 될 때 까지 do while문 실행
3. 현재 위치와 옮겨야할 글자들과의 거리를 구한 배열 생성
4. 가장 가까운 거리의 인덱스를 구한 뒤,
5. 움직인 거리와 알파벳을 바꿔야 할 횟수 count
7. 현재 위치 갱신
8. 3~7번 반복
***********************************************************************/

function getDiffIdx(arr) {
	let result = [];
	for (let i = 0; i < arr.length; i++)
		if (arr[i] !== 'A') result.push(i);
	return result;
}

function getDistance(diffIdx, currIdx, N) {
	let leftDistance;
	let rightDistance;
	if (currIdx <= diffIdx) {
		leftDistance = currIdx + (N - diffIdx);
		rightDistance = diffIdx - currIdx;
	}
	else {
		leftDistance = currIdx - diffIdx;
		rightDistance = diffIdx + (N - currIdx);
	}
	return leftDistance < rightDistance ? leftDistance : rightDistance;
}

function getAlphabetCount(name, diffIdx) {
	return name.charCodeAt(diffIdx) < 78 ? name.charCodeAt(diffIdx) - 65 : 91 - name.charCodeAt(diffIdx);
}

function solution(name) {
	const N = name.length;
	let diffIdxArr = getDiffIdx(name);
	let currIdx = 0;
	let count = 0;
	
	do {
		let distanceArr = diffIdxArr.map((el) => getDistance(el, currIdx, N));
		let minIdx = distanceArr.indexOf(Math.min.apply(null, distanceArr));
		let [ diffIdx ] = diffIdxArr.splice(minIdx, 1);
		
		count += distanceArr[minIdx]
		count += getAlphabetCount(name, diffIdx);
		currIdx = diffIdx;
	} while (diffIdxArr.length)

	return count;
}

console.log(solution("JAZ")); // 11
console.log(solution("JEROEN")); // 56
console.log(solution("JAN")); // 23
console.log(solution("ABAAAAAAAAABB")); // 7