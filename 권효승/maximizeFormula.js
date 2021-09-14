// https://programmers.co.kr/learn/courses/30/lessons/67257

function getPermutation(arr, tmp, result) {
  if (tmp.length === arr.length) {
    result.push(tmp.slice());
    return;
  }

  for (let i = 0; i < arr.length; i++)
    if (!tmp.includes(arr[i])) getPermutation(arr, [...tmp, arr[i]], result);
}

function calculate(operands, operator) {
  if (operator === "+") return operands[0] + operands[1];
  if (operator === "-") return operands[0] - operands[1];
  if (operator === "*") return operands[0] * operands[1];
}

function getAnswer(operands, operators, priority) {
  let answer = 0;
  let priorityIdx = 0;

  while (operators.length) {
    let idx = operators.indexOf(priority[priorityIdx]);
    if (idx > -1) {
      answer = calculate([operands[idx], operands[idx + 1]], operators[idx]);
      operands.splice(idx, 2, answer);
      operators.splice(idx, 1);
    } else priorityIdx++;
  }
  return Math.abs(answer);
}

function solution(expression) {
  let maxAnswer = 0;
  const operands = expression.match(/[0-9]+/g).map(Number);
  const operators = expression.split(/[0-9]+/g).filter(Boolean);
  let priorities = [];
  getPermutation([...new Set(operators)], [], priorities);

  priorities.forEach((priority) => {
    let answer = getAnswer(operands.slice(), operators.slice(), priority);
    if (answer > maxAnswer) maxAnswer = answer;
  });
  return maxAnswer;
}

var expression = "100-200*300-500+20";
console.log(solution(expression));
