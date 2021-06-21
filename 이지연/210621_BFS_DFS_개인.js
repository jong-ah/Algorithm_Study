//! 포기했던 자료구조 코플릿 11_[Graph] 인접 행렬 길찾기

function getDirections(matrix, from, to) {
  // TODO: 여기에 코드를 작성합니다.
  // from에서 to까지의 길을 찾기 위해서 from을 요소로 갖는 배열인 큐를 하나 만들어 놓는다
  const queue = [from]; // 큐에서 간선을 넣고 빼는 함수를 하나 구현해 놓고
  const enqueue = (n) => queue.push(n);
  const dequeue = (n) => queue.shift();  // queue는 선입선출이기때문에 뺄때는 앞에서 뺀다. 그래서 pop이 아니라 shift

  // 간선을 방문했는지 확인할 수 있는 배열을 하나 만들어 놓고
  const isVisited = new Array(matrix.length).fill(false);
  // 같은 곳을 또 방문하지 않게 하기 위해서 방문을 시작하기 전에 첫 정점을 true로 바꾸고 시작을 한다
  isVisited[from] = true

  // 확인이 완료되면 큐에서 요소를 빼내기 때문에 큐의 길이가 0일 될때까지 반복한다. 
  while(queue.length > 0) {
    const cur = dequeue();

    if(cur === to) { // 현재 위치와 도착지점이 같으면 true를 리턴한다. 이는 길이 있다는 것을 의미
      return true
    }
    for(let next = 0; next < matrix[cur].length; next++) {
      if(matrix[cur][next] && !isVisited[next]) {
        enqueue(next)
        // 다음으로 방문할 버텍스가 next이므로 true로 만들어놓고 시작하면 재방문하지 않는다. 
        isVisited[next] = true
      }
    }

  }

  return false
}




//! 포기했던 자료구조 코플릿 13_[DFS / BFS] 연결된 정점들

function connectedVertices(edges) {
    // TODO: 여기에 코드를 작성합니다.
    // 인접행렬을 만들어서 버텍스를 순환해보자
    // 배열을 flat해서 최대버텍스를 구해보면...
    let maxVertex = Math.max(...edges.flat())+1
    // 구현을 위한 matrix를 만들어서 간선을 추가하면..
    let matrix = new Array(maxVertex).fill(0).map(el => new Array(maxVertex).fill(0))
    edges.forEach(el => {
      matrix[el[0]][el[1]] = 1
      matrix[el[1]][el[0]] = 1
    })
  
    // 방문여부를 체크할 수 있도록 도구를 하나 만들어 놓자
    let isVisited = new Array(maxVertex).fill(false)
    let count = 0
  
    // 반복문을 돌려서 버텍스를 순회하면
    for(let vertex=0; vertex < maxVertex; vertex++) {
      if(!isVisited[vertex]) {
        bfs(matrix, vertex, isVisited)
        count++
      }
    }
  
    return count;
  }
  
  // bfs로 탐색하는 것을 구현하면....
  function bfs (matrix, vertex, isVisited) {
    const queue = [vertex]
    const dequeue = (n) => queue.shift()
    const enqueue = (n) => queue.push(n)
  
    isVisited[vertex] = true
  
    while(queue.length>0) {
      const cur = dequeue();
      for(let next=0; next < matrix[cur].length; next++) {
        if(matrix[cur][next] && !isVisited[next]) {
          enqueue(next)
          isVisited[next] = true
        }
      }
    }
  }
  
  // dfs 자체를 재귀로 탐색할 수 있음
  function dfs (matrix, vertex, isVisited) {
    isVisited[vertex] = true
    for(let next=0; next<matrix.length; next++) {
      if(matrix[vertex][next] && !isVisited[next]) {
        dfs(matrix, next, isVisited)
      }
    }
  }
  


  //? 더 생각해볼 문제
  // dfs로 탐색하는 것도 구현해봐야함
  // 인접리스트를 만들어서 순회하는 방법도 구현해봐야함
