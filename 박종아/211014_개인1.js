'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/42890?language=javascript

// TODO 후보키
/*********************************************************************** 
input으로 데이터베이스을 받는다.
output으로 데이터베이스의 후보키의 수를 출력한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 유일하고, 최소성이 있는 키가 후보키이다.
2. 오랜만에 다시 본 조합도 생각이 안 나고, 조합+유일도 뭔가 있을거같은데 감이 안 왔다.
3. 이래서 수도코드가 필요한가보다
4. 조합될 수 있는 모든 경우의 수를 배열로 만든다.
4-1. 인덱스로 조합 배열을 만든다.
4-2. 인덱스 조합 배열을 활용해 데이터베이스의 튜플을 만든다.
5. 데이터베이스의 튜플이 유일한지 확인한다.
6. 유일하다면 answer++해주고, 유일한 인덱스를 제외한 인덱스 조합 배열에서 다시 유일한 것을 찾는다.
7. 조합을 모두 확인하였으면 answer를 리턴한다.
7-1. 궁금한 점은 여기서 최소성은 어떻게 확인한거지?

* 코드참고 : https://velog.io/@sqaurelu/ALGO-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%ED%9B%84%EB%B3%B4%ED%82%A4%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-javascript
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 조합 재귀합수는 O(2^n)이라고 한다. (이 스코프 부분의 복잡도가 제일 큰 것같다.)
 * 개선하게 된다면, 효율성이 좋은 비트마스크를 이해하고 풀어보고 싶다.
 ***********************************************************************/

function 조합() {
  function combination(elements, k) {
    let prev_elements = [];
    let results = [];

    function dfs(elements, k) {
      // 이전요소가 길이가 같으면 리턴할 results에 넣는다.
      if (prev_elements.length === k) {
        const tmp = prev_elements.slice().join('');
        results.push(tmp);
        return;
      }

      for (let i = 0; i < elements.length; i++) {
        let next_elements = elements.slice(i + 1, elements.length);
        prev_elements.push(elements[i]);

        // 다음 요소들을 재귀함수로 돌린다.
        dfs(next_elements, k);
        console.log(next_elements, k);
        prev_elements.pop();
      }
    }

    dfs(elements, k);

    return results;
  }

  // 유일한지 확인한다.
  function isUnique(tuple) {
    const tmp = tuple.map((item) => item.join(''));
    const set = new Set(tmp);
    return tmp.length === set.size ? true : false;
  }

  function solution(relation) {
    let answer = 0;

    const colNum = relation[0].length;

    let indexes = new Array(colNum).fill(0).map((_, i) => i);

    // column들의 조합
    let colCom = [];
    for (let i = 0; i < colNum; i++) {
      colCom.push(...combination(indexes, i + 1));
    }

    while (colCom.length > 0) {
      const columns = colCom.shift().split('');

      // console.log(columns);

      // 튜플을 만든다.
      const tuple = relation.map((row) => columns.map((col) => row[col]));

      if (isUnique(tuple) === true) {
        // 유일하다면 희소성
        answer += 1;

        const colComTmp = [];

        for (let i = 0; i < colCom.length; i++) {
          columns.map((col) => {
            if (!colCom[i].includes(col)) {
              // 유일한거 제외하고 다른 유일한 것을 찾는다.
              colComTmp.push(colCom[i]);
            }
          });
        }

        colCom = colComTmp;
        // console.log(`colCom :`, colCom)
      } else {
        continue;
      }
    }

    return answer;
  }

  let relation = [
    ['100', 'ryan', 'music', '2'],
    ['200', 'apeach', 'math', '2'],
    ['300', 'tube', 'computer', '3'],
    ['400', 'con', 'computer', '4'],
    ['500', 'muzi', 'music', '3'],
    ['600', 'apeach', 'music', '2'],
  ];
  let output = solution(relation);
  console.log(output);
}

조합();

function 비트마스크() {
  function solution(relation) {
    let answer = 0;

    let col = relation[0].length;
    let row = relation.length;

    let bitmask = [];
    for (let i = 1; i < 1 << col; i++) {
      let bit = '';
      for (let j = 0; j < col; j++) {
        if ((i & (1 << j)) !== 0) bit += j;
      }
      bitmask.push(bit);
      bit = '';
    }

    bitmask.sort((a, b) => a.length - b.length);

    while (bitmask.length > 0) {
      let col = bitmask.shift().split('').map(Number);
      let set = new Set();

      relation.map((tuple) => {
        let tmp = '';

        for (let i = 0; i < col.length; i++) {
          tmp += tuple[col[i]];
        }
        set.add(tmp);
      });

      // 유일성
      if (set.size === row) {
        answer += 1;
        // 최소성
        bitmask = bitmask.filter((item) => !col.every((v) => item.includes(v)));
      }
    }

    return answer;
  }

  let relation = [
    ['100', 'ryan', 'music', '2'],
    ['200', 'apeach', 'math', '2'],
    ['300', 'tube', 'computer', '3'],
    ['400', 'con', 'computer', '4'],
    ['500', 'muzi', 'music', '3'],
    ['600', 'apeach', 'music', '2'],
  ];
  let output = solution(relation);
  console.log(output);
}

비트마스크();
