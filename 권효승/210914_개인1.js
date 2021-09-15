// https://programmers.co.kr/learn/courses/30/lessons/12909

function solution(s) {
  let arr = s.split("");
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") stack.push(arr[i]);
    else {
      if (stack.length === 0) return false;
      else stack.pop();
    }
  }

  return stack.length ? false : true;
}

// var s = "(())()";
var s = "(()(";
console.log(solution(s));
