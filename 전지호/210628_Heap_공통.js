function swap(idx1, idx2, arr) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

function getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
}

function insert(heap, value) {
    heap.push(value);

    if (heap.length > 1) {
        let current = heap.length - 1;
        let parent = getParentIdx(current);

        while (parent >= 0 && heap[current] > heap[parent]) {
            swap(current, parent, heap);

            current = parent;
            parent = getParentIdx(current);
        }
    }

    return heap;
}

function Heapify(heap) {
    if (heap.length === 0) return [0, 0];

    let curIdx = 0;
    let minIdx = 0;

    while (curIdx !== minIdx) {
        curIdx = minIdx;

        let left = curIdx * 2 + 1;
        let right = curIdx * 2 + 2;

        if (left < heap.length && heap[left] > heap[minIdx]) {
            minIdx = left;

            swap(curIdx, minIdx, heap);
        }

        if (right < heap.length && heap[right] > heap[minIdx]) {
            minIdx = right;

            swap(curIdx, minIdx, heap);
        }
    }

    return heap;
}

// function solution(operations) {
//     //! 큰 틀
//     //? 1. operations 는 명령어가 들어가있는 string 형식의 배열이다.
//     //? 2. 공백 문자를 기준으로 명령어를 나눠주고 뒤의 수를 Value 로 사용해 위의 함수들을 이용한다.
//     //? 3. Insert 와 remove 를 만들어주었고 switch 로 나누어서 만들까?? 생각해보자

// ?     최종적인 데이터를 담을 queue
//     let queue = [];

// ?     먼저 operations 가 비었을때 출력
//     if(operations.length === 0) {
//         return [0, 0];
//     }

// ?     일단 operations 안의 명령어들을 모두 수행할 것임
// ?     길이만큼 반복진행
//     for(let i = 0; i < operations.length; i++) {

//        let command = operations[i][0];              //? 앞에 알파벳으로 이루어진 명령어
//        let value = Number(operations[i].slice(2));  //? 공백 문자를 건너뛴 value 값 Number 로 형변환

//        if(command === 'I') {
//            insert(queue, value);
//        } else if(command === 'D' && value === 1) {
//            queue.shift();

//            Heapify(queue);
//        } else if(command === 'D' && value === -1) {
//            queue.pop();

//            Heapify(queue);
//        }
//     }

//     return queue.length !== 0 ? [queue[0], Math.min(...queue)] : [0, 0];
// }

//! 문제 풀이 후기
/********************************
1. 음.. 이번 문제는 위의 Heap 을 사용한 방법으로 문제를 풀면 테스트 케이스 2, 3, 6번이 통과가 안됐다.
2. 그래서 질문사항을 보고 2, 3, 6 통과 안되는 사람이 많아서 힌트를 얻고자 들어가서 살펴봤는데 뭐.. 값이 비어있을때 처리를 해주어야한다고 해서
3. 값 비었을 때 처리를 해주어도 안되서 그냥 생각해보니.. max 랑 min 을 지우면 되는 것 같고 해서
4. 밑의 코드 처럼 그냥 max min 을 지우고 insert 할때는 값을 넣어주고 정렬, 이런거 신경 하나도 안쓰고 했는데
5. 정답처리가 되어버렸다.. 뭐징..
*********************************/
function solution(operations) {
    let heap = [];

    if (operations.length === 0) {
        return [0, 0];
    }

    for (let i = 0; i < operations.length; i++) {
        let order = operations[i][0];
        let value = Number(operations[i].slice(2));

        let idx = 0;

        if (order === 'D' && value === 1) {
            let max = Math.max(...heap);
            idx = heap.findIndex(v => max === v);

            heap.splice(idx, 1);
        } else if (order === 'D' && value === -1) {
            let min = Math.min(...heap);
            idx = heap.findIndex(v => min === v);

            heap.splice(idx, 1);
        } else {
            heap.push(value);
        }
    }

    return heap.length !== 0 ? [Math.max(...heap), Math.min(...heap)] : [0, 0];
}

console.log(solution([]));
console.log(solution(["I 16", "D 1"]));
console.log(solution(["I 7", "I 5", "I -5", "D -1"]));
console.log(solution(["D 1", "D 1", "D -1", "D -1"]));
console.log(solution(["D -1"]));
console.log(solution(["I 325", "I 325", "I -45"]));
console.log(solution(["I -45", "I 325", "I -45", "D 1"]));
console.log(solution(["I -45", "I 325", "I -45", "D -1"]));