// https://programmers.co.kr/learn/courses/30/lessons/77485

// 시간 복잡도
/**********************************************************************
row cols의 최대값이 100이므로 돌리는 행위는 최대 400
쿼리의 갯수는 최대 10000, 쿼리의 수를 n이라 할때 400n => O(n)
***********************************************************************/

// 개선점
/**********************************************************************
query를 넘길 때 구조분해 할당으로 넘겨도 될듯
***********************************************************************/

function getMatrix(rows, columns) {
  let matrix = [];
  var value = 1;
  for (let i = 0; i < rows; i++) {
    let tmpArr = [];
    for (let j = 0; j < columns; j++) {
      tmpArr.push(value);
      value++;
    }
    matrix.push(tmpArr);
  }
  return matrix;
}

function getIdx(startRow, startColumn, endRow, endColumn) {
  let idxArr = [];
  let row = startRow;
  let col = startColumn;
  for (col; col < endColumn; col++) idxArr.push([row - 1, col - 1]);
  for (row; row < endRow; row++) idxArr.push([row - 1, col - 1]);
  for (col; col > startColumn; col--) idxArr.push([row - 1, col - 1]);
  for (row; row > startRow; row--) idxArr.push([row - 1, col - 1]);

  return idxArr;
}

function rotatePartMatrix(matrix, startRow, startColumn, endRow, endColumn) {
  let idxArr = getIdx(startRow, startColumn, endRow, endColumn);
  idxArr.reverse();
  let tmp = matrix[idxArr[0][0]][idxArr[0][1]];
  let min = tmp;

  for (let i = 0; i < idxArr.length - 1; i++) {
    let [x1, y1] = idxArr[i];
    let [x2, y2] = idxArr[i + 1];
    matrix[x1][y1] = matrix[x2][y2];
    if (matrix[x1][y1] < min) {
      min = matrix[x1][y1];
    }
  }
  matrix[idxArr[idxArr.length - 1][0]][idxArr[idxArr.length - 1][1]] = tmp;
  return min;
}

function solution(rows, columns, queries) {
  let result = [];
  let matrix = getMatrix(rows, columns);

  for (let i = 0; i < queries.length; i++) {
    let query = queries[i];
    result.push(
      rotatePartMatrix(matrix, query[0], query[1], query[2], query[3])
    );
  }

  return result;
}

console.log(
  solution(6, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ])
);
