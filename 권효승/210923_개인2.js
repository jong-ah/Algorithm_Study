// https://programmers.co.kr/learn/courses/30/lessons/60058

// 시간 복잡도
/**********************************************************************
재귀가 있지만 결국 괄호 갯수만큼 반복문이 돌아가므로..?
O(n)
***********************************************************************/

// 개선점
/**********************************************************************
함수 모듈화를 시도하면 더 괜찮은 코드가 나올듯..
***********************************************************************/

function solution(p) {
  let result = "";
  let leftCount = 0;
  let rightCount = 0;
  let isBalance = true;

  // 1. 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다.
  if (p.length === 0) return "";

  for (let i = 0; i < p.length; i++) {
    if (p[i] === "(") leftCount++;
    if (p[i] === ")") rightCount++;

    if (rightCount > leftCount) isBalance = false;

    // 2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다.
    // 단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다.
    if (leftCount === rightCount) {
      // 3. 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행합니다.
      if (isBalance) {
        result += p.slice(0, i + 1);
        result += solution(p.slice(i + 1, p.length));
        //   3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환합니다.
        return result;
      }
      // 4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다.
      else {
        //   4-1. 빈 문자열에 첫 번째 문자로 '('를 붙입니다.
        result += "(";
        //   4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다.
        result += solution(p.slice(i + 1, p.length));
        //   4-3. ')'를 다시 붙입니다.
        result += ")";

        //   4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다.
        for (let j = 1; j < i; j++) {
          if (p[j] === ")") result += "(";
          if (p[j] === "(") result += ")";
        }
        //   4-5. 생성된 문자열을 반환합니다.
        return result;
      }
    }
  }
}

var p = "()))((()";
console.log(solution(p));
