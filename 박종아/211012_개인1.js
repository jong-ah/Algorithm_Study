'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/17684?language=javascript

// TODO 압축
/*********************************************************************** 
input으로 문자열을 받는다.
output으로 압축한 문자열의 색인 번호 number 배열을 출력한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 한글자는 무조건 사전에 있다.
2. 두글자가 없다면 한글자 색인 번호를 출력하고, 두글자를 사전에 추가한다.
3. 다음엔 두글자가 사전에 있을 수 있다.
3. 그럼 두글자 색인 번호를 출력하고, 세글자를 사전에 추가한다.
4. 이를 반복하여 색인 번호를 출력한다.

* 문자를 확인하면 색인 번호 출력과 사전 추가, 2가지를 해야한다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 while(O(N))안에 PlusDictStr 함수의 while(O(N)), includes(O(N)), slice(O(N))가 고려하면 O(N^4)인가.... N : msg.length
 * (두 단어가 사전에 들어갈 일이 많을 것 같아서 따로 뺐지만, 최악의 경우를 고려하는 빅오 시간복잡도라 복잡도가 높다.)
 * (사전에 단어가 추가되고, pos 또한 재할당되니 내가 생각한 시간복잡도만큼 복잡하진 않을거같은데... )
 * 개선하게 된다면 dict를 배열이 아닌 객체로 만들어 indexOf, includes를 사용 안 할 수 있게 만들거나, undefined가 안 나오게 범위값을 조절해서 slice를 사용을 안 하게 할 수 있을것같다
 ***********************************************************************/

// 사전에 세글자 이상의 새단어 추가하기
// * 모든 단어를 다 확인하면 while문이 끝난다.
// * 글자가 사전에 있다면, 한 단어씩 추가한다.
// * 추가한 단어에 undefined라면 끝자리를 의미하므로, 그 전 단어를 리턴한다.
// * 글자가 사전에 없다면, 단어의 위치와 사전에 추가할 글자와 answer에 추가할 글자를 리턴한다.
function PlusDictStr(temp, pos, msg, msgLen, dict) {
  while (pos < msgLen) {
    if (dict.includes(temp)) {
      pos++;
      temp += msg[pos];
      if (msg[pos] === undefined) {
        return [pos, temp.slice(0, temp.length - 9)];
      }
    } else return [pos, temp, temp.slice(0, temp.length - 1)];
  }
}

function solution(msg) {
  var answer = [];
  const msgLen = msg.length;
  const dict = [
    -1,
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let pos = 0;

  // 모든 단어를 다 확인하면 while문이 끝난다.
  // 첫글자는 다 있으므로 두글자가 있는지 확인한다.
  // 두글자가 있다면
  // * 세글자 이상의 단어가 사전에 등록되어 있는지 확인한다.
  // * 단어 위치를 재할당한다.
  // * 새로운 단어를 추가한다.
  // * output[2] === 사전에 들어가는 단어의 전 단어를 answer에 추가한다.
  // * output[2]가 없는 경우는 끝자리인 경우이다.
  // 두글자가 없다면
  // * 끝자리인 경우, msg[pos]가 undefined이다.
  // * 이 경우를 제외하고, 없는 두글자를 사전에 추가한다.
  while (pos < msgLen) {
    pos++;

    let temp = `${msg[pos - 1] + msg[pos]}`;
    let dictNum = dict.indexOf(temp);

    if (dictNum > 0) {
      const output = PlusDictStr(temp, pos, msg, msgLen, dict);
      pos = output[0];
      dict.push(output[1]);
      if (output[2]) answer.push(dict.indexOf(output[2]));
      else answer.push(dict.indexOf(output[1]));
    } else {
      answer.push(dict.indexOf(msg[pos - 1]));
      if (msg[pos] !== undefined) {
        dict.push(temp);
      }
    }
  }

  return answer;
}

// let msg = 'KAKAO';
// let msg = 'TOBEORNOTTOBEORTOBEORNOT';
let msg = 'ABABABABABABABAB';
let output = solution(msg);
console.log(output);

/******* 테스트 *******
테스트 1 〉	통과 (0.14ms, 30.4MB)
테스트 2 〉	통과 (0.16ms, 30.4MB)
테스트 3 〉	통과 (0.13ms, 30.3MB)
테스트 4 〉	통과 (0.55ms, 30.5MB)
테스트 5 〉	통과 (0.10ms, 30MB)
테스트 6 〉	통과 (0.52ms, 30.6MB)
테스트 7 〉	통과 (0.46ms, 30.4MB)
테스트 8 〉	통과 (0.43ms, 30.2MB)
테스트 9 〉	통과 (0.11ms, 30.2MB)
테스트 10 〉	통과 (0.45ms, 30MB)
테스트 11 〉	통과 (0.48ms, 30.5MB)
테스트 12 〉	통과 (0.56ms, 30.6MB)
테스트 13 〉	통과 (1.56ms, 30.5MB)
테스트 14 〉	통과 (1.51ms, 30.6MB)
테스트 15 〉	통과 (1.42ms, 30.5MB)
테스트 16 〉	통과 (0.99ms, 30.3MB)
테스트 17 〉	통과 (0.53ms, 30.5MB)
테스트 18 〉	통과 (0.24ms, 30.2MB)
테스트 19 〉	통과 (0.31ms, 30.2MB)
테스트 20 〉	통과 (0.57ms, 30.6MB)
*******************/

/******* 개선할 점에서 쓴 참고 코드 *******
function solution(msg) {
    var list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    var dic = list.reduce((d, a, i) => (d[a] = i + 1, d), {})

    var result = [];

    var maxLen = 1;
    for (var i = 0; i < msg.length; i++) {

        var w = msg[i];
        var c = msg[i+1];
        while (dic[w+c] && i < msg.length - 1) {
            i++;

            w = w+c;
            c = msg[i+1];
        }

        result.push(dic[w]);

        list.push(dic[w+c]);
        dic[w+c] = list.length;
    }

    return result;
}
*******************/

/******* 참고 테스트 *******
내코드보다 높은것도 있고 낮은 것도 있고..

테스트 1 〉	통과 (0.28ms, 30.3MB)
테스트 2 〉	통과 (0.31ms, 30.1MB)
테스트 3 〉	통과 (0.27ms, 30.2MB)
테스트 4 〉	통과 (0.53ms, 30.3MB)
테스트 5 〉	통과 (0.29ms, 30.3MB)
테스트 6 〉	통과 (0.58ms, 30.9MB)
테스트 7 〉	통과 (0.52ms, 30.3MB)
테스트 8 〉	통과 (0.89ms, 30.1MB)
테스트 9 〉	통과 (0.27ms, 30.2MB)
테스트 10 〉	통과 (0.58ms, 30.6MB)
테스트 11 〉	통과 (0.35ms, 30.2MB)
테스트 12 〉	통과 (0.57ms, 30.6MB)
테스트 13 〉	통과 (0.75ms, 30.5MB)
테스트 14 〉	통과 (0.73ms, 30.6MB)
테스트 15 〉	통과 (0.76ms, 30.6MB)
테스트 16 〉	통과 (0.67ms, 30.8MB)
테스트 17 〉	통과 (0.56ms, 30.3MB)
테스트 18 〉	통과 (0.40ms, 30.1MB)
테스트 19 〉	통과 (0.39ms, 30.1MB)
테스트 20 〉	통과 (0.41ms, 30.6MB)
*******************/
