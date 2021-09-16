// https://programmers.co.kr/learn/courses/30/lessons/17679

// 시간 복잡도
/**********************************************************************
n의 기준이 어디일까요..
***********************************************************************/

// 개선점
/**********************************************************************
배열을 돌리는 것이 더 최선인건지
checkSquare 부분이 불필요하게 실행이 많이 되는 것 같기도함
***********************************************************************/


"use strict";

function checkSquare(board, i, j, letter) {
  if (
    board[i + 1][j] === letter &&
    board[i][j + 1] === letter &&
    board[i + 1][j + 1] === letter
  )
    return true;
  return false;
}

function checkRemoveEl(board, m, n) {
  let removes = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < m - 1; j++) {
      const letter = board[i][j];
      if (checkSquare(board, i, j, letter) && letter !== "0")
        removes.push([i, j], [i, j + 1], [i + 1, j], [i + 1, j + 1]);
    }
  }
  return removes;
}

function popBlock(board, removes) {
  removes.forEach((remove) => {
    const [x, y] = remove;
    board[x][y] = "0";
  });
  board.forEach((arr) =>
    arr.sort((a, b) => {
      if (a === "0") return -1;
      if (b === "0") return 1;
      return 0;
    })
  );
}

function rotateBoard(board, m, n) {
  board = board.map((el) => el.split(""));
  let rotatedBoard = Array.from(Array(n), () => new Array(m).fill(null));

  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      rotatedBoard[i][j] = board[j][n - i - 1];
    }
  return rotatedBoard;
}

function getZeroCount(board, m, n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === "0") count++;
    }
  }
  return count;
}

function solution(m, n, board) {
  board = rotateBoard(board, m, n);
  let removes;

  do {
    removes = checkRemoveEl(board, m, n);
    popBlock(board, removes, m, n);
  } while (removes.length);

  return getZeroCount(board, m, n);
}
