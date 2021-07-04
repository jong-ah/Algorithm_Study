'use strict';

// * https://www.acmicpc.net/problem/5525
// 백준 해시 문제 모음 https://www.acmicpc.net/workbook/view/201
// 백준 해시맵 문제 모음 https://www.acmicpc.net/problemset?sort=ac_desc&algo=136

// TODO IOIOI 이해하기
/***********************************************************************
  탐색해야하는 문자열에서 주어진 문자열이 몇 군데 포함되었는지 구한다.
  주어진 문자열은 'IOIOI'처럼 접두어와 접미어가 일치한다.
  주언진 문자열이 'AB', 탐색해야하는 문자열이 'ABCAB'라면 답은 2이다.
***********************************************************************/

// TODO 수도코드
/***********************************************************************
 // ? 1. 주어진 문자열이 접두어와 접미어가 일치함으로 불일치가 발생하기 직전까지 같았던 부분(접두어)은 다시 비교하지 않는 알고리즘 KMP를 사용한다.
 // ? 2. 주어진 문자열의 접두어와 접미어가 일치하는 수를 문자열.length가 0~끝까지 하나씩 확인한다. makeLPS
 // ? 3. 탐색하는 문자열에서 주어진 문자열과 불일치가 발생할 때, 불일치가 발생했던 데에서 접두어와 접미어가 일치한 수를 확인하고 그 뒤부터 다시 확인한다.
 // ? 4. 주어진 문자열이 모두 일치할 때, 다음 탐색하는 문자열은 주어진 문자열의 접두어가 일치한 것이므로 그 뒤부터 다시 확인한다.
 // ? 5. 탐색하는 문자열을 모두를 탐색했다면 일치할 때마다 count++했던 수를 리턴한다.
 // 첫번째 S전체_확인 시간 복잡도는 원본 문자열의 길이가 N, 탐색 문자열의 길이가 M 일떄 O(NM)
 // 두번째 S중_P첫부분_일치확인은 P의 첫부분 일치하는데서부터 문자열을 탐색하여 시간을 '쪼끔' 줄여줬다.
 // 세번째 접두어_접미어_일치확인은 KMP 알고리즘 사용하여 시간복잡도가 O(N+M)
***********************************************************************/

const S전체_확인 = () => {
  // const fs = require('fs');
  // const input = fs.readFileSync('dev/stdin').toString().split('\n');
  const input = `2
13
OOIOIOIOIIOII`.split('\n');

  let [N, M, S] = input;
  const P = 'I'.padEnd(N * 2 + 1, 'OI');
  let result = 0;

  for (let i = 0; i < M; i++) {
    if (S.slice(i, P.length + i) === P) {
      result++;
    }
  }

  console.log(result);
};

S전체_확인();
/* 결과 50점 */
/* 메모리 8532KB */
/* 시간 132ms */

/***********************************************************************/

const S중_P첫부분_일치확인 = () => {
  // const fs = require('fs');
  // const input = fs.readFileSync('dev/stdin').toString().split('\n');
  const input = `2
13
OOIOIOIOIIOII`.split('\n');

  let [N, M, S] = input;
  const P = 'I'.padEnd(N * 2 + 1, 'OI');
  let result = 0;
  let find = S.indexOf('I');
  S = S.slice(find);
  let idx = 0;

  while (S.length > P.length - 1) {
    if (S.slice(idx, P.length + idx) === P) {
      result++;
      S = S.substr(2);
      find = S.indexOf('I');
      S = S.slice(find);
    } else {
      S = S.slice(1);
    }
  }

  console.log(result);
};

S중_P첫부분_일치확인();
/* 결과 50점 */
/* 메모리 8548KB */
/* 시간 124ms */

/***********************************************************************/

const 접두어_접미어_일치확인 = () => {
  // const fs = require('fs');
  // const input = fs.readFileSync('dev/stdin').toString().split('\n');
  const input = `2
13
OOIOIOIOIIOII`.split('\n');

  // +를 넣어 number로 만든다.
  const N = +input[0];
  const M = +input[1];
  const S = input[2];

  const P = 'IO'.repeat(N) + 'I';

  // makeLPS : 주어진 문자열의 가장 긴 접두어이자 접미어의 길이를 찾아 내는 알고리즘
  const makeLPS = (pattern) => {
    const table = Array.from({ length: pattern.length }, () => 0);

    let left = 0;
    let right = 1;
    while (right < pattern.length) {
      while (left > 0 && pattern[left] !== pattern[right]) {
        // prefix !== suffix
        left = table[left - 1];
      }

      if (pattern[left] === pattern[right]) {
        // prefix === suffix
        table[right] = ++left;
      }
      right++;
    }
    return table;
  };

  // kmp : 문자열 검색을 위한 알고리즘, 패턴 매칭, ctrl + F
  // 불일치가 발생하기 직전까지 같았던 부분은 다시 비교하지 않는 패턴 매칭(검색)
  const kmp = (parent, pattern) => {
    const lps = makeLPS(pattern);
    let count = 0;

    let parentIdx = 0;
    let patternIdx = 0;
    while (parentIdx < parent.length) {
      while (patternIdx > 0 && parent[parentIdx] !== pattern[patternIdx]) {
        patternIdx = lps[patternIdx - 1];
      }

      if (parent[parentIdx] === pattern[patternIdx]) {
        if (patternIdx === pattern.length - 1) {
          // 문자 모두 매칭
          count++;

          // prefix 길이만큼 점프
          patternIdx = lps[patternIdx];
        } else {
          patternIdx++;
        }
      }
      parentIdx++;
    }
    return count;
  };

  console.log(kmp(S, P));

  // ! 코드 인용 https://ryulurala.tistory.com/334?category=988636
  // ! 갓빈나님의 KMP 영상 https://www.youtube.com/watch?v=yWWbLrV4PZ8
  // ! 갓빈나님의 KMP 블로그 https://m.blog.naver.com/PostView.naver?blogId=ndb796&logNo=221240660061&referrerCode=0&searchKeyword=kmp

  // * Array.from 신기하다.
  // let arr = Array.from(P);
  // let arr = Array.from({ length: P.length }, () => 0);
  // let arr = Array.from(P, () => 0);
  // let arr = Array(P.length).fill(0);
  // console.log(arr);
};

접두어_접미어_일치확인();
/* 결과 100점 */
/* 메모리 16012KB */
/* 시간 264ms */
