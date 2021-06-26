'use strict';

// * https://www.acmicpc.net/problem/2220

// TODO heapSort1 수도코드
/***********************************************************************
 1. swap 수를 늘리기 위해서 가장 작은 수(1)이 배열의 맨 끝(heap.length -1)에 위치해야한다.
 2. heap 배열에 수를 차례대로 넣는데, 1이 맨 뒤에 항상 위치할 수 있도록 swap 해준다.
 3. 맨 뒤의 위치한 1을 제외하고 나머지 앞의 요소들은 최대힙으로 만들어준다.
 4. 모든 요소들을 다 사용했으면 리턴한다.
 // ? 요소가 들어간 배열을 만들고, forEach, heap 빈배열을 써서 만들었다.
 // ? heap에 [1]을 넣은 상태로 시작하고 for문을 돌리는 것으로도 할 수 있다.
***********************************************************************/

// ! 그냥 최대힙이 아니다.
// ! 힙으로 만든 다음, 최대힙으로 만들때 swap 회수가 최대한 많도록 해야한다.
// ! node.js 제출한 것은 통과 못 한다! 통과한 node.js가 없다. 시스템상 오류로 보인다.

const heapSort1 = () => {
  // const fs = require('fs');
  // const input = fs.readFileSync('dev/stdin').toString().split('').map((n) => parseInt(n));
  const input = '6'.split('').map((n) => parseInt(n));
  const arr = new Array(input[0]).fill(1).map((num, idx) => num + idx);

  const heap = [];

  const getParentIdx = (idx) => {
    return Math.floor((idx - 1) / 2);
  };

  const swap = (a, b, heap) => {
    [heap[a], heap[b]] = [heap[b], heap[a]];
  };

  const heapify = (num) => {
    if (heap.length === 0) heap.push(num);
    else {
      heap.push(num);
      swap(heap.length - 2, heap.length - 1, heap);

      if (heap.length > 2) {
        // -> maxHeap으로 함수르 따로 빼서 만들 수 있다.
        let curIdx = heap.length - 2;
        let pIdx = getParentIdx(curIdx);
        while (pIdx >= 0 && heap[curIdx] > heap[pIdx]) {
          swap(curIdx, pIdx, heap);
          curIdx = pIdx;
          pIdx = getParentIdx(curIdx);
        }
      }
      return heap;
    }
  };

  arr.forEach((num) => {
    heapify(num);
  });

  console.log(heap.join(' '));
  console.log(heap.join(' ') === '6 5 3 2 4 1');
};

heapSort1();

// TODO heapSort2 수도코드
/***********************************************************************
 1. swap 수를 늘리기 위해서 가장 작은 수(1)이 배열의 맨 끝(heap.length -1)에 위치해야한다.
 2. heap[0,1]을 넣은 이유는 for문의 num을 idx 역할과 요소 역할 둘 다 하기 위해서이다.
 3. curIdx 최근 추가한 최대값의 idx가 들어 있다. 그 값이 1이 될 때까지 swap 해준다. (0이 아닌 1의 최대값 위치)
 4. 부모idx를 구하는 getParentIdx로 따로 빼지 않고, 바로 넣었다. 
 5. 맨 앞이 자리 채우고 있던 0은 slice로 없애고 리턴한다.
***********************************************************************/

const heapSort2 = () => {
  // const fs = require('fs');
  // const input = fs.readFileSync('dev/stdin').toString().split('').map((n) => parseInt(n));
  const input = '6'.split('').map((n) => parseInt(n));

  const heap = [0, 1];

  const swap = (a, b, heap) => {
    [heap[a], heap[b]] = [heap[b], heap[a]];
  };

  for (let num = 2; num <= input[0]; num++) {
    heap.push(num);
    swap(num, num - 1, heap);

    if (heap.length > 2) {
      let curIdx = num - 1;
      while (curIdx != 1) {
        swap(curIdx, Math.floor(curIdx / 2), heap);
        curIdx = Math.floor(curIdx / 2);
      }
    }
  }

  console.log(heap.slice(1).join(' '));
  console.log(heap.slice(1).join(' ') === '6 5 3 2 4 1');
};

heapSort2();
