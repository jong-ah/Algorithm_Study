// https://programmers.co.kr/learn/courses/30/lessons/42628

/******* 풀이 *******
1. split으로 영어와 숫자 영역을 나눔
2. 나눠진 숫자를 문자형에서 int타입으로 변경
3. 각 명령어에 맞게 순차적으로 실행
4. 값을 삭제해야 할 때는 정렬한 뒤 실행
*******************/

function operate(arr, [command, number]) {
	if (command === 'I') arr.push(number);
	arr.sort((a, b) => a - b);
	if (command === 'D') {
		if (number === 1) arr.pop();
		if (number === -1) arr.shift();
	}
}

function solution(operations) {
	let operatorArr = operations.map(el => el.split(' '));
	operatorArr.forEach(el => { el[1] = parseInt(el[1]); });
	let arr = [];

	while (operatorArr.length) operate(arr, operatorArr.shift());
	arr.sort((a, b) => a - b);
	
	return arr.length ? [arr[arr.length - 1], arr[0]] : [0, 0];
}



var operations = ["I 16","D 1"];
console.log(solution(operations)); //[0,0]
var operations = ["I 7","I 5","I -5","D -1"];
console.log(solution(operations)); //[7,5]