'use strict';

// * https://urclass.codestates.com/codeproblem/2651bb57-7595-48d3-af83-422128f15a1a

// TODO 다익스트라 알고리즘
/*********************************************************************** 
* 다익스트라 알고리즘은 하나의 정점을 출발점으로해서 모든 정점까지의 최단 경로를 구하는 알고리즘이다.
distance[a][c]>distance[a][b]+distance[b][c] 가 성립한다면
distance[a][c]=distance[a][b]+distance[b][c];

1. 너비 우선 탐색은 가중치가 없는 균일 그래프에서 최단 경로를 계산하는 데 사용.
2. 다익스트라 알고리즘은 가중 그래프에서 최단 거리를 계산하는 데 사용.
3. 다익스트라 알고리즘은 모든 가중치가 양수일 때 정상적으로 동작.
4. 만약 가중치가 음수이면 벨만-포드 알고리즘을 사용.
5. 그래프에 사이클 cycle이 있을 경우 다익스트라 알고리즘을 사용할 수 없음.

* 참고자료
- [다익스트라 알고리즘](https://taesung1993.tistory.com/48)
- [JavaScript로 Heap | Priority Queue 구현하기] (https://jun-choi-4928.medium.com/javascript%EB%A1%9C-heap-priority-queue-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-8bc13bf095d9)
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 문제 읽다가 다익스트라 알고리즘을 몰라 알아보고 풀었다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 모든 각각의 경로에 대한 최단경로를 구하기 때문에 O(N³)이다 (N:정점의 수)
 * 개선하게 된다면, 코드로는 잘 모르겠고, 지금은 인접행렬로 풀었는데 힙으로 푸는 것도 있는데 알아봐야겠다.
 ***********************************************************************/

function createGraphByMatrix(num, edges) {
  const matrix = [];
  const INF = 101;
  for (let i = 0; i <= num; i++) {
    matrix.push(Array(num + 1).fill(INF));
    // 출발점과 도착점이 같으면 0으로 할당
    matrix[i][i] = 0;
  }
  edges.forEach(([src, dst, weight]) => {
    // 무방향이므로
    matrix[src][dst] = matrix[dst][src] = weight;
  });
  return matrix;
}

function Dijkstra(num, edges, start, end) {
  // TODO: 여기에 코드를 작성합니다.
  // 0. 인접행렬을 만든다.
  const matrix = createGraphByMatrix(num, edges);

  console.log(matrix);

  const dist = matrix[start].slice();
  console.log(dist);

  // 1. 출발 정점을 제외하고 모두 미방문 상태로 만든다.
  const visited = Array(num + 1).fill(false);
  visited[start] = true;

  // 2. 출발 정점에서 바로 갈 수 있는 정점을 표시한다.
  // * before은 바로 직전의 정점을 표시한다.
  const before = Array(num + 1).fill(-1);
  edges.forEach(([src, dst]) => {
    if (src === start) before[dst] = src;
    if (dst === start) before[src] = dst;
  });

  console.log(before);

  // 3. 출발 정점과의 거리가 가장 짧은 정점을 리턴한다.
  const getNextNearestIdx = (dist) => {
    let min = Number.MAX_SAFE_INTEGER;
    let target;
    for (let i = 1; i <= num; i++) {
      if (dist[i] < min && visited[i] === false) {
        min = dist[i];
        target = i;
      }
    }
    return target;
  };

  // 메 루프를 통해 (다음으로) 출발 정점과의 거리가 짧은 정점을 계산한다.
  // 루프 횟수는 num -2 (출발 정점과 임의의 정점 제외)
  for (let round = 0; round < num - 2; round++) {
    const nearest = getNextNearestIdx(dist);
    console.log(nearest);

    // 짧은 정점은 방문한 것으료 표시
    visited[nearest] = true;
    console.log(visited);

    // 현재 시점에서 출발 정점과
    // 현재 시점에서 가장 가까운 정점을 기준으로
    // 더 짧은 거리로 갱신한다.
    // ! 최단 경로의 부분 경로 역시 최단 경로이다.
    visited.forEach((calculated, v) => {
      console.log(calculated, v);
      if (calculated === false) {
        // 1 → 2보단 1 → 3 → 2가 더 가깝다.
        if (dist[nearest] + matrix[nearest][v] < dist[v]) {
          dist[v] = dist[nearest] + matrix[nearest][v];

          // 최단 경로를 갱신한다.
          before[v] = nearest;
        }
      }
    });
  }

  console.log(before);

  console.log(dist);

  return dist[end];
}

let num = 4;
let edges = [
  [1, 2, 6],
  [1, 3, 2],
  [2, 3, 3],
  [2, 4, 1],
  [3, 4, 5],
];
let start = 1;
let end = 4;
let output = Dijkstra(num, edges, start, end);
console.log(output); // --> 6 (1 - 3 - 2 - 4)
