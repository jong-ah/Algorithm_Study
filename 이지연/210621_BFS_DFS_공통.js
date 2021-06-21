function solution(n, computers) {
    var answer = 0;

    // 재방문을 하지 않기 위해서 방문여부를 체크할 수 있도록 false로 채워진 배열을 하나 만들어 놓는다. 
    const isVisited = new Array(n).fill(false)

    // 각 컴퓨터(=vertex)는 0부터 n-1인 정수로 표현된다고 했으므로 0번컴퓨터부터 n-1번 컴퓨터까지를 순회한다.
    for(let computer = 0; computer < n; computer++) {
        if(!isVisited[computer]) { // 일단은 방문여부를 체크해서 방문하지 않았다면
            bfs(computers, computer, isVisited) // 재귀함수를 통해서 순회하고
            answer++ // 결과값을 1 증가시킨다. 
        }
    } 

    // 결과값을 반환한다. 
    return answer;
}

// 너비우선탐색을 하는 함수 bfs를 만들어 보자
function bfs(computers, computer, isVisited) {

    // 먼저 방문을 시작하기 전에 방문했음을 체크하고 시작한다.
    isVisited[computer] = true
    
    // computers라는 2차 배열을 탐색을 한다. 
    for(let next=0; next<computers.length; next++) {
        // 만약 2차원 배열의 숫자가 1이고 방문하지 않았다면, 
        if(computers[computer][next] && !isVisited[next]) {
            // 재귀를 통해서 탐색을 한다. 
            bfs(computers, next, isVisited)
        }
    }
}

//! 너비우선탐색을 하는 함수 bfs는 재귀를 쓰지않고 반복문으로 만들수도 있다.
//! 그러나 아래의 방법으로 bfs를 실행하면 프로그래머스에서는 런타임오류가 발생, 테스트케이스에 통과하지 못한다.  
function bfs(computers, computer, isVisited) {
    // 탐색을 하기 위해 computer를 요소로 갖는 큐라는 배열을 만들어 놓는다..
    const queue = [computer]
    const dequeue = () => queue.shift()  // 큐에서 요소를 꺼내기 위한 함수를 만들어 놓는다. 
    const enqueue = (n) => queue.push(n)  // 큐에 요소를 넣기 위한 함수를 만들어 놓는다. 

    // 처음으로 입력받은 computer의 방문여부를 체크하고 시작한다. 
    isVisited[computer] = true;

    // 반복문을 돌려서 확인을 하는데 
    //? 언제까지? 큐가 빈배열이 될때까지 돌린다
    while(queue.length > 0) { // 이렇게 하면 큐가 빈배열이 되면 반복문을 빠져나온다

        const cur = dequeue(); // 탐색을 시작하기 위해서 cur이라는 변수를 선언하고 큐에서 요소를 하나 꺼내서 할당한다. 

        for(let next=0; next< computers[cur].length; next++) {
            // computers를 탐색했을때 2차배열 안의 요소의 값이 1이고 방문한 적이 없으면
            if(computers[cur][next] && !isVisited[next]) { 
                enqueue(next) // 위 조건을 만족하는 next가 있으면 큐에 넣는다
                isVisited[next] = true // 그리고 방문여부를 체크한다. 
            }
        }
    }
}


//! 너비우선탐색(BFS) vs 깊이우선탐색(DFS) 
// 너비우선탐색과 깊이우선탐색의 차이점은 다음에 방문할 정점을 어떻게 저장하느냐이다. 
// 너비우선탐색은 큐(선입선출)를 사용하고 깊이우선탐색은 스택(후입선출)을 사용한다.  

// 깊이우선탐색(DFS)은 
    //* 컴퓨터는 구조적으로 항상 스택의 원리를 사용하기 때문에 스택을 사용하지 않고 단순히 재귀함수만 사용해도 구현이 가능하다. 
    // 구현하기가 쉽고 메모리도 적게 사용한다. 스택에 현재 정점과 연결된 부모정점만 저장하면 되기 때문이다.
    // 그러나 탐색하려는 정점이 출발점에서 너무 많은 단계가 떨어져있다(=깊이가 깊다면)고 예상이 된다면 BFS를 쓰는 것이 현명하다.

// 너비우선탐색(BFS)는 
    // 각 검색단계마다 검색 범위의 경계선 전체를 저장해야하기 때문에 정점이 수백만에 달하면 사용하기가 어려워진다. 
    // 너비우선탐색은 최단경로를 찾아준다는 점에서 최단길이를 보장해야할 때 많이 사용한다.(e.g. 미로찾기)



//? BFS와 DFS의 알고리즘 문제유형
// 1. A와 B사이에 경로의 존재여부를 Boolean값으로 구하기 => 코플릿 11번
// 2. 최단경로 구하기
// 3. A와 B사이에 존재하는 모든 경로를 구하기


//* 더 생각해볼 문제
// DFS로 코드를 구현하는 것
// 인접행렬이 아닌 인접리스트로 만들어서 순회하는 방법
