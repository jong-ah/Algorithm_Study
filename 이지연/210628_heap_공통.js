//? 프로그래머스 레벨3 이중우선순위 큐

//= 테스트 케이스
//= ["I 4", "I 3", "I 2", "I 1", "D 1", "D 1", "D -1", "D -1", "I 5", "I 6"]
//= TC6 ["I 1", "I 2", "I 3", "I 4", "I 5", "I 6", "I 7", "I 8", "I 9", "I 10", "D 1", "D -1", "D 1", "D -1", "I 1", "I 2", "I 3", "I 4", "I 5", "I 6", "I 7", "I 8", "I 9", "I 10", "D 1", "D -1", "D 1", "D -1"]


//! operations의 각 요소를 순회하면서 각 요소(el)의 첫번째가 I인지, D인지에 따라서 다음을 수행한다. 
    // 1. 각 조건에 따라 값을 담을 빈 배열을 하나 만들어 놓고 
    // 2. el[0]이 I면 배열에 I이후의 값을 숫자로 변환해서 넣는다.
    // 3. el[0]이 D이면 배열을 정렬하고 아래를 수행한다. 
    // 3-1. el.slice(2)가 -1이면 배열에서 최소값을 삭제하고
    // 3-2. el.slice(2)가 1이면 배열에서 최대값을 삭제한다. 
    // 4. operations의 순회가 끝나고 난 최종 배열을 확인했을 때 
    // 4-1. 배열의 길이가 0이면 [0, 0] 반환
    // 4-2. 배열의 길이가 0이 아니면 배열의 최대값과 최소값을 요소로 갖는 배열을 반환


// heap이 아닌 sort로 구현을 할 수 있다(더 간단히!)
function solution(operations) {

    var answer = [];
    let queue = []
    
    operations.forEach(el=> {
        if(el[0] === 'I') {
            queue.push(Number(el.slice(2)))
            queue.sort((a,b) => a-b)  //* arr.sort()가 아니라 heap를 구현하면 시간복잡도가 작아지겠지만...
        } 
        if (el[0] ==='D') {
            if(el.slice(2) === '-1') { 
                queue.shift()
            } else {
                queue.pop()
            }
        }
    })
    
    if(queue.length) {
        answer.push(queue.slice(-1)[0])
        answer.push(queue[0]) 
    } else {
        answer = [0, 0]
    }

    return answer;
}


//* heap정렬의 특징
// 1. 시간복잡도? => O(nlogn)
    //# heap을 쓰는 가장 근본적인 이유가 아닐까? arr.sort()의 경우 최악의 상황에서 시간복잡도가 O(n^2)가 될 수 있다. 
// 2. 부가적인 메모리가 필요없음


//* 최소힙: 부모노드의 키값이 자식노드의 키값보다 항상 작은 트리
//* 최대힙: 부모노드의 키값이 자식노드의 키값보다 항상 큰 트리
