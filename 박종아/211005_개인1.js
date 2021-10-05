'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/49994?language=javascript

// TODO 방문길이
/*********************************************************************** 
input으로 캐릭터가 이동한 방향을 string으로 준다.
output으로 캐릭터가 처음 걸어본 길의 길이를 number로 출력한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 더럽게 풀었지만 뭐가 틀렸는지 모르겠다.
1-1. 일단 특정 반복 코드를 변수로 만들지 않아 더렵다
1-2. 범위는 -1부터 9이고, -1의 경우 '-'만 나타낸다.
1-3. (내 생각 point) move 배열에 모든 이동경로 넣고, 이동경로는 '이전경로+이동경로'이다.
1-4. (내 생각 point) 양방향 모두 없을 때 answer을 더한다.
2. 다른이코드 함수처럼 set을 사용하지 않은 이유 : 다른이처럼 현재위치를 now로 선언해 재할당하지 않고, move[0]을 가져다썼다.
3. 4,4로 시작점을 잡은 이유 : 처음엔 0,0으로 했는데 -단위가 계산이 어려워서 양수로 나타나게 할려고 했다. 그러나 결과적으로 -1이 있거나 10이 있어야했다.
4. 더럽게풀고실패 함수는 테스트케이스를 해봤을 땐 다 정답이 나왔다. 무슨 문제가 있을텐데 그걸 잘 모르겠다.
5. 코드는 더러워도 뭔가 해결될거같아보이니 계속 잡고 있었다. 해결하고 코드 정리할려고 했다.
6. 테스트케이스가 더 많았다면.. 하는 미련은 남지만 다른 풀이를 얼른 생각하고 다시 푸는 것이 더 나아보인다.
7. 흑..흑...흑....
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 for문의 영향을 받아 O(N)일 것 같다. N : dirs.length
 * 개선하게 된다면, 정해진 시간내에 못 풀면 깔끔한 포기와 다른 코드로 생각해야한다는 점과 set과 재할당을 잘 고려해야한다는 점이다.
 ***********************************************************************/

function 더럽게풀고실패() {
  function answerPlus(move, arr) {
    if (
      move.includes(arr) ||
      move.includes(`${arr.slice(2)}${arr.slice(0, 2)}`)
    )
      return 0;
    return 1;
  }

  function solution(dirs) {
    let move = [`4444`];
    let answer = 0;
    let arr;

    for (let i = 0; i < dirs.length; i++) {
      if ('U' === dirs[i]) {
        if (Number(move[0][3]) < 9 || Number(move[0][3]) === '-') {
          if (Number(move[0][3]) === '-') {
            arr = `${move[0].slice(2)}${move[0][2]}0`;
          } else {
            arr = `${move[0].slice(2)}${move[0][2]}${Number(move[0][3]) + 1}`;
          }
          answer += answerPlus(move, arr);
          move.unshift(arr);
        }
      } else if ('D' === dirs[i]) {
        if (Number(move[0][3]) >= 0) {
          if (Number(move[0][3]) === 0) {
            arr = `${move[0].slice(2)}${move[0][2]}-`;
          } else {
            arr = `${move[0].slice(2)}${move[0][2]}${Number(move[0][3]) - 1}`;
          }
          answer += answerPlus(move, arr);
          move.unshift(arr);
        }
      } else if ('R' === dirs[i]) {
        if (Number(move[0][2]) < 9 || Number(move[0][2]) === '-') {
          if (Number(move[0][2]) === '-') {
            arr = `${move[0].slice(2)}0${move[0][3]}`;
          } else {
            arr = `${move[0].slice(2)}${Number(move[0][2]) + 1}${move[0][3]}`;
          }
          answer += answerPlus(move, arr);
          move.unshift(arr);
        }
      } else if ('L' === dirs[i]) {
        if (Number(move[0][2]) >= 0) {
          if (Number(move[0][2]) === 0) {
            arr = `${move[0].slice(2)}-${move[0][3]}`;
          } else {
            arr = `${move[0].slice(2)}${Number(move[0][2]) - 1}${move[0][3]}`;
          }
          answer += answerPlus(move, arr);
          move.unshift(arr);
        }
      }
    }

    // console.log(move);
    // console.log(answer);

    return answer;
  }

  // let dirs = 'ULURRDLLU'; // 7
  // let dirs = 'LULLLLLLU'; // 7
  // let dirs = 'UDU'; // 1
  // let dirs = 'RRRRRRRRRRRRRRRRRRRRRUUUUUUUUUUUUULU'; // 11
  // let dirs = 'LURDLURDLURDLURDRULD'; // 7
  let dirs = 'UUUUDUDUDUUU'; // 5
  // let dirs = 'LLLLRLRLRLL'; // 5
  let output = solution(dirs);
  console.log(output);
}

더럽게풀고실패();

function 다른이코드() {
  function solution(dirs) {
    let move = { L: [-1, 0], R: [1, 0], U: [0, 1], D: [0, -1] };
    let now = [0, 0];
    let route = new Set();

    for (let dir of dirs) {
      let nowX = now[0] + move[dir][0];
      let nowY = now[1] + move[dir][1];

      if (nowX > 5 || nowX < -5 || nowY > 5 || nowY < -5) continue;

      route.add('' + now[0] + now[1] + nowX + nowY);
      route.add('' + nowX + nowY + now[0] + now[1]);

      now = [nowX, nowY];
    }

    // console.log(route);
    return route.size / 2;
  }

  // let dirs = 'ULURRDLLU'; // 7
  // let dirs = 'LULLLLLLU'; // 7
  let dirs = 'UDU'; // 1
  // let dirs = 'RRRRRRRRRRRRRRRRRRRRRUUUUUUUUUUUUULU'; // 11
  // let dirs = 'LURDLURDLURDLURDRULD'; // 7
  //   let dirs = 'UUUUDUDUDUUU'; // 5
  // let dirs = 'LLLLRLRLRLL'; // 5
  let output = solution(dirs);
  console.log(output);
}

다른이코드();
