'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/42628

// TODO 수도코드
/***********************************************************************
 00) 최소, 최대를 어떻게 구하는지에 따라 코드가 다르다.
 01) Math.max, Math.min을 이용하여 값을 구하고 indexOf로 위치를 찾아 뺐다.
 02) sort로 정렬하고 push, pop을 이용하여 숫자를 추가하거나 뺐다.
 03) heap sort는 생각 안 나서 다른 사람 코드를 가져왔다. getHeap 함수로 정렬한다.
***********************************************************************/

// ! 시간 복잡도와 최적화는 어떻게 알 수 있을까?
// 0(N)인가? 힙정렬은 0(logN) ??
// 어떤게 최적화일까?
// 01) if (result.length === 0) continue; -> 2번 반복
// 02) operations.shift(); -> 4번 반복
// 03) 반복이 없는 힙정렬 코드가 최적화된 것일까?

// ! 01) max, min
function solution1(operations) {
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === 'D 1') {
      if (result.length === 0) continue;
      let maxIdx = result.indexOf(Math.max.apply(null, result));
      result.splice(maxIdx, 1);
    } else if (operations[i] === 'D -1') {
      if (result.length === 0) continue;
      let minIdx = result.indexOf(Math.min.apply(null, result));
      result.splice(minIdx, 1);
    } else {
      let num = parseInt(operations[i].slice(2));
      result.push(num);
    }
  }

  return result.length ? [Math.max(...result), Math.min(...result)] : [0, 0];
}

// ! 02) push, pop
function solution2(operations) {
  const result = [];

  do {
    if (operations[0][0] === 'D') {
      if (result.length === 0) operations.shift();
      else if (operations[0][2] === '1') {
        result.pop();
        operations.shift();
      } else {
        result.shift();
        operations.shift();
      }
    } else {
      result.push(parseInt(operations[0].slice(2)));
      result.sort((a, b) => a - b);
      operations.shift();
    }
  } while (operations.length > 0);

  return result.length ? [result[result.length - 1], result[0]] : [0, 0];
}

// ! 03) heap sort
function solution3(operations) {
  const heap = [];

  const getHeap = (num) => {
    if (heap.length === 0) heap.push(num);
    else {
      let check = false,
        i = 0;
      while (!check) {
        if (num < heap[i]) i++;
        else {
          heap.splice(i, 0, num);
          check = true;
        }
      }
    }
  };

  for (let i = 0; i < operations.length; i++) {
    let arr = operations[i].split(' ');
    arr[1] = arr[1] | 0; // 이부분 잘 모르겠다.
    if (arr[0] === 'I') getHeap(arr[1]);
    else {
      if (arr[1] === 1) heap.shift();
      else heap.pop();
    }
  }

  return heap.length ? [heap[0], heap[heap.length - 1]] : [0, 0];
}

let operations = [
  'I -45',
  'I 653',
  'D 1',
  'I -642',
  'I 45',
  'I 97',
  'D 1',
  'D -1',
  'I 333',
];
let operations3 = [
  // push, pop으로 없애서 다시 만들었다.
  'I -45',
  'I 653',
  'D 1',
  'I -642',
  'I 45',
  'I 97',
  'D 1',
  'D -1',
  'I 333',
];
let output1 = solution1(operations);
let output2 = solution2(operations);
let output3 = solution3(operations3);
console.log(output1);
console.log(output2);
console.log(output3);
