// 사이클 검사 함수
// function findParent(arr, a, b) {

//     for(let i = 0; i < arr.length; i++) {
//         for(let j = 0; j < arr[i].length - 1; j++) {
//             if(arr[i][j] === a && arr[i][j + 1] === b) {
//                  이으려하던 두 간선이 같은 부모를 가졌다면 false return
//                 return false;
//             }
//         }
//     }

//     return true;
// }

// Union-Find
function getParent(parent, x) {
    // 부모를 찾는 재귀함수

    // 재귀 함수의 종료 부분
    if (parent[x] === x) return x;

    return parent[x] = getParent(parent, parent[x]);
}

// 두 부모 노드를 합치는 함수
function unionParent(parent, a, b) {
    // 각각의 부모의 값을 찾아옴
    a = getParent(parent, a);
    b = getParent(parent, b);

    // 만약 a 의 값이 더 작으면 b 를 a로 바꿔줌
    // 즉 더 작은 부모의 값으로 바꿔줌

    // Union-Find 는 항상 부모를 바꿔줄때 더 작은 값으로 바꿔주는 특징이 있다.
    if (a < b) {
        parent[b] = a;
    } else {
        parent[a] = b;
    }
}

// 같은 부모를 가지는지 확인(즉, 사이클을 도는지)
function findParent(parent, a, b) {
    a = getParent(parent, a);
    b = getParent(parent, b);

    // a 와 b 의 부모의 값을 가져온 뒤에
    // a 와 b 의 부모가 같다면 return true 를 해줌
    if (a === b) {
        return true;
    }

    return false;
}

function solution(n, costs) {
    // 최소 비용 신장 트리??
    // 크루스칼 알고리즘을 이용해서 풀어볼 예정이다.
    // 크루스칼 알고리즘은 가장 적은 비용으로 모든 노드를 연결하기 위해 사용되는 알고리즘이다.

    // 모든 노드가 다 연결이 되어있는지 확인해야하고, 가장 적은 비용의 간선을 이용해서 노드들을 연결해야함
    // 최소 비용 신장 트리를 만들때 사용한 최종적인 간선의 갯수 = 노드의 총 갯수 - 1 이 된다.

    // 크루스칼 알고리즘의 핵심 : 간선을 거리가 짧은 순서대로 그래프에 포함시킨다.
    // 모든 간선의 정보를 오름차순으로 정렬한 후에 비용이 적은 간선부터 차근차근 그래프에 포함시키면 된다.

    // 구현 시 주의사항 : 사이클이 발생하면 안된다.

    // 정리해보면
    // 1. 모든 간선들을 거리를 기준으로 오름차순 정렬을 수행한다.
    // 2. 가장 적은 비용으로 모든 노드들을 연결한다.
    // 3. 사이클을 형성하는 경우 간선을 포함하지 않는다.

    // 생각 정리
    // 1. 주어진 costs 배열에서 간선의 비용순으로 정렬을 해준 새로운 배열을 만든다.
    // 2. 그리고 사이클이 돌지 않기 위해서 이미 연결한 노드의 정보를 만들 배열 즉 Visited 를 만듬
    // 3. 최소 비용부터 계속 연결해나가면서 잇다가 사이클이 돌게되면 그 다음 간선의 정보로 넘어가면 된다.
    // 4. queue 를 사용해서 구현한다?
    // 5. Visited 를 만들어서 연결된 부분의 노드들은 true 로 만들어주면될듯
    // 6. 그리고 visited 의 element 들이 모두 true 가 되면 그대로 반복을 끝내면 된다. x
    // - visited 의 모든 원소가 true 라는걸 어떻게 알게?, 비효율적인 반복



    // arr 간선의 비용대로 정렬
    let edgeSortArr = costs.sort((a, b) => {
        return a[2] - b[2];
    });

    // Union-Find 를 위한 부모 배열 생성
    let parent = [];

    for (let i = 0; i < n; i++) {
        // Union-Find 의 특성은
        // 처음 초기화때 해당하는 인덱스는 자신의 값을 동일하게 가져야한다.
        parent[i] = i;
    }

    // 비용을 모두 더한 값
    let result = 0;

    // 각 인덱스마다 연결되어 있는 노드의 정보를 가질 배열
    // let isVisited = Array(n).fill(0);
    // 위와 같이 하려했으나 주소 공유로 인해 데이터가 같이 push됨

    // let isVisited = [];

    // for(let i = 0; i < n; i++) {
    //     isVisited.push([]);
    // }


    // 이렇게 풀다가 부모를 어떻게 찾을지 매우 고민했음..
    // 그러다 union-find 라는 개념을 찾음 
    // for(let i = 0; i < edgeSortArr.length; i++) {

    //     let firstNum = edgeSortArr[i][0];
    //     let secondNum = edgeSortArr[i][1];

    //     let edgeWeight = edgeSortArr[i][2];

    //     if(findParent(isVisited, firstNum, secondNum)) {
    //         isVisited[firstNum].push(secondNum);

    //         result += edgeWeight;
    //         edgeCount++;
    //     }

    //     if(edgeCount === (n - 1)) {
    //         break;
    //     }
    // }

    for (let i = 0; i < edgeSortArr.length; i++) {
        // 구조분해 할당
        let [firstNum, secondNum, edgeWeight] = edgeSortArr[i];

        if (!findParent(parent, firstNum, secondNum)) {
            unionParent(parent, firstNum, secondNum);
            result += edgeWeight;
        }
    }

    return result;
}