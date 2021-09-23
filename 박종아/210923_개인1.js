'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/49993?language=javascript

// TODO 스킬트리
/*********************************************************************** 
input으로 문자열(축약된 필수 skill 순서)과 배열(유저들이 만든 축약된 skill 순서)이 들어온다.
output으로 문자열의 순서를 지켜진 배열 요소를 리턴해야한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 문자열 스킬만 모두 filter로 뽑아내고, 그 순서가 맞는지 확인한다.
2. legnth를 리턴한다.
* 문자열 전체가 안 같아도 된다. 일부라도 그 스킬대로 진행되기만 하면 된다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 for .. of와 filter(or indexOf)가 영향을 줬고 값은 skill_trees.length(N) * skill+trees의 요소.length(M)일 것이다.
 * 개선하게 된다면, skill의 조건에 만족했지만 뒤의 추가 스킬이 있다면 그것까지 확인하게 되어있으므로 33줄에 '만족한다면 break;'를 줬을 것이다.
 ***********************************************************************/

function solution(skill, skill_trees) {
  // 0의 값이 영향을 줄 수 있으므로 안정적인 -1를 할당한다.
  var answer = -1;
  const arrSkill = skill.split('');

  for (let userSkill of skill_trees) {
    const arrUserSkill = userSkill.split('');

    // 유저가 만든 skill에서 필수 skill를 뽑아낸다.
    const temp = arrUserSkill.filter((el) => arrSkill.includes(el));

    // 뽑아낸 skill의 순서를 맞는지 확인하고 맞다면 더한다.
    if (skill.indexOf(temp.join('')) === 0) answer++;
  }

  return answer + 1;
}

const skill = 'CBD';
const skill_trees = ['BACDE', 'CBADF', 'AECB', 'BDA'];
const output = solution(skill, skill_trees);
console.log(output);
