// https://programmers.co.kr/learn/courses/30/lessons/70129

function solution(s) {
  let count = 0;
  let zeros = 0;

  while (s !== "1") {
    zeros += s.match(/0/g) !== null ? s.match(/0/g).length : 0;
    s = s.replace(/0/g, "").length.toString(2);
    count++;
  }
  return [count, zeros];
}

var s = "110010101001";
console.log(solution(s));
