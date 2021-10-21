'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/42890?language=javascript

// TODO 프렌즈4블록
/*********************************************************************** 
input으로 board의 높이와 길이를 나타내는 number와, 블록을 나타내는 string array을 받는다.
output으로 블록이 몇 개 지워지는 지 number를 출력한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 2x2형태의 4개가 붙어있는 대문자의 위치를 찾는다. (set)
2. 위치에 해당되는 데이터를 지운다. (재할당 = '', count++)
3. 중간에 데이터가 지워지면 위에 있는 데이터를 가져온다. 
(for문 아래서부터 돌리고, 아래에 데이터가 없고 위에 데이터가 있으면 서로 바꿔 재할당한다.)
4. 2x2형태가 없을 때까지 1~3번을 반복한다.
5. 반복이 끝나면 count를 리턴한다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는.. 어느부분에서 set이 더 오래 걸리는지 잘 모르겠다. 시간복잡도는 O(n*m*?) ? : pos.length없을때까지
 (풀이과정은 같은데 시간복잡도가 다르다)
 * 개선하게 된다면 시간 오래걸리는 부분을 알아내서 효율성있게 만든다.
 ***********************************************************************/

function 시간초과() {
  // 2x2형태의 4대다 붙어있는 대문자 위치 찾기
  function findTwoTwo(m, n, board) {
    const start = new Set();
    const pos = new Set();

    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (board[i][j] !== '') {
          start.add(board[i][j]);
          start.add(board[i + 1][j]);
          start.add(board[i][j + 1]);
          start.add(board[i + 1][j + 1]);
          if (start.size === 1) {
            pos.add(`${i}${j}`);
            pos.add(`${i + 1}${j}`);
            pos.add(`${i}${j + 1}`);
            pos.add(`${i + 1}${j + 1}`);
          }
        }
        start.clear();
      }
    }
    return pos;
  }

  // 데이터 삭제하기
  function deleteData(pos, board) {
    for (let i = 0; i < pos.length; i++) {
      if (pos[i][0] !== 0 && board[pos[i][0] - 1][pos[i][1]] !== '') {
        board[pos[i][0]][pos[i][1]] = board[pos[i][0] - 1][pos[i][1]];
        board[pos[i][0] - 1][pos[i][1]] = '';
      }
    }
    return board;
  }

  function solution(m, n, board) {
    var answer = 0;
    board = board.map((x) => x.split(''));
    let pos = [''];

    while (pos.length) {
      pos = [...findTwoTwo(m, n, board)];
      board = deleteData(pos, board);
      answer += pos.length;
    }

    return answer;
  }

  const m = 4;
  const n = 5;
  const board = ['CCBDE', 'AAADE', 'AAABF', 'CCBBF'];
  const output = solution(m, n, board); // 14
  console.log(output);
}

시간초과();

function 통과() {
  const solution = (m, n, board) => {
    let answer = 0;
    //1. 먼저 배열의 문자열을 2차원 배열로 나눈다.
    board = board.map((v) => v.split(''));

    //2. 배열에서 지워질 블록의 인덱스를 구해 arr안에 넣는다.
    while (true) {
      const arr = [];
      for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n - 1; j++) {
          if (
            board[i][j] &&
            board[i][j] === board[i + 1][j] &&
            board[i][j] === board[i][j + 1] &&
            board[i][j] === board[i + 1][j + 1]
          ) {
            arr.push([i, j]);
          }
        }
      }
      // 답을 구하는 로직 : 깨질 블록이 없다면 0인 개수를 세고 리턴한다.
      if (!arr.length) {
        return [].concat(...board).filter((v) => !v).length;
      }

      // 3. 배열에서 지워질 블록을 0으로 바꾼다.
      for (let i = 0; i < arr.length; i++) {
        const col = arr[i][0];
        const row = arr[i][1];
        board[col][row] = 0;
        board[col][row + 1] = 0;
        board[col + 1][row] = 0;
        board[col + 1][row + 1] = 0;
      }

      // 4. 깨진 블록을 없애고 위에서 블록을 당겨온다.
      for (let i = m - 1; i > 0; i--) {
        if (!board[i].some((v) => !v)) continue;

        for (let j = 0; j < n; j++) {
          for (let k = i - 1; k >= 0 && !board[i][j]; k--) {
            if (board[k][j]) {
              board[i][j] = board[k][j];
              board[k][j] = 0;
              break;
            }
          }
        }
      }
    }
  };

  const m = 4;
  const n = 5;
  const board = ['CCBDE', 'AAADE', 'AAABF', 'CCBBF'];
  const output = solution(m, n, board); // 14
  console.log(output);
}

통과();
