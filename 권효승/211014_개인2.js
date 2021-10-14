// https://programmers.co.kr/learn/courses/30/lessons/72412

function countRank(infoArr, query, answer) {
  let count = 0;
  infoArr.forEach((v) => {
    let flag = true;
    for (let i = 0; i < query.length - 1; i++) {
      if (query[i] === "-") continue;
      if (v[i] !== query[i]) {
        flag = false;
        break;
      }
    }
    if (Number(query[4]) > Number(v[4])) flag = false;
    if (flag) count++;
  });
  answer.push(count);
}

function solution(info, query) {
  let answer = [];
  let infoArr = info.map((v) => v.split(" "));
  let queryArr = query.map((v) => v.split(" ").filter((v) => v !== "and"));

  for (let i = 0; i < queryArr.length; i++)
    countRank(infoArr, queryArr[i], answer);
  return answer;
}

var info = [
  "java backend junior pizza 150",
  "python frontend senior chicken 210",
  "python frontend senior chicken 150",
  "cpp backend senior pizza 260",
  "java backend junior chicken 80",
  "python backend senior chicken 50",
];

var query = [
  "java and backend and junior and pizza 100",
  "python and frontend and senior and chicken 200",
  "cpp and - and senior and pizza 250",
  "- and backend and senior and - 150",
  "- and - and - and chicken 100",
  "- and - and - and - 150",
];

console.log(solution(info, query));
