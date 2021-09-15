'use strict';

// * https://urclass.codestates.com/codeproblem/18797c8d-ce79-4c88-b948-0d500c179399

// TODO 벨만-포드 알고리즘
/*********************************************************************** 
다익스트라 알고리즘과 같은 단일 시작점 최단 경로 알고리즘

* 다익스트라 알고리즘과 차이점
1. 음수 간선이 있는 그래프에 대해서도 최단 경로를 찾을 수 있다.
2. 음수 싸이클이 있어 최단거리가 제대로 정의되지 않은 경우에도 찾을 수 있다.
→ 음의 가중치는 허용하지만 가중치의 합이 음인 사이클은 허용하지 않다.
→ 사이클의 합이 음수인 경우가 존재하는 경우 이를 발견하여 알려 줄 수 있다.

* 동작 과정
1. 시작점 → 시작점까지의 최단거리는 0이다. dist[start] = 0;
2. 나머지 원소들은 아주 큰 수(Number.MAX_SAFE_INTEGER)로 초기화한다.
3. u → v 최단 거리의 특성 : dist[v] <= dist[u] + w(u,v)
:: start → v까지의 최단거리는, start → u까지의 최단거리 + 가중치보다 클 수 없다.
4. dist[to] <= dist[from] + weight은 항상 성립한다.

* 시간 복잡도 : O(V * E) 

* 참고 레퍼런스
- [최단 경로(Shortest Path) 2 - 벨만-포드 알고리즘(Bellman-Ford Algorithm)](https://www.apexcel.blog/algorithm/graph/shortest-path/bellman-ford/)
- [벨만-포드 알고리즘](https://projooni.tistory.com/entry/%EB%B2%A8%EB%A7%8C%ED%8F%AC%EB%93%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)
- [다익스트라 알고리즘](https://www.zerocho.com/category/Algorithm/post/584bd46f580277001862f1af)
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 문제 읽다가 벨만-포트 알고리즘을 몰라 알아보고 풀었다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는  O(정점 * 간선 수)으로 정점과 간선 수에 따라 다르다.
 * 개선하게 된다면, 음수 싸이클 여부 함수를 따로 만들 것이다.
 ***********************************************************************/

function BellmanFord(num, edges, start) {
  // TODO: 여기에 코드를 작성합니다.
  // 적당히 큰 값을 이용해야 값이 변동 되었을 때 비교할 수 있다.
  const INF = Number.MAX_SAFE_INTEGER;
  const dist = Array(num + 1).fill(INF);
  dist[start] = 0;
  // console.log(dist)

  for (let i = 1; i <= num; i++) {
    for (let j = 0; j < edges.length; j++) {
      const [from, to, weight] = edges[j];
      if (dist[to] > dist[from] + weight) {
        // 모순이 생길 경우, dist가 줄어드는 것은 완화(relax)한다고 한다.
        dist[to] = dist[from] + weight;
      }
    }
  }

  // 완화시켰음에도 음수 사이클이 존재하는 경우
  for (let k = 0; k < edges.length; k++) {
    const [from, to, weight] = edges[k];
    if (dist[to] > dist[from] + weight) {
      return [];
    }
  }

  // 0부터 시작하는 정점이 없으므로 slice(1)한다.
  return dist.slice(1);
}

// ! 아래와 같이 음수 싸이클이 존재 여부를 판단하는 함수를 따로 만들 수 있다.
// * some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트합니다.
// * 빈 배열에서 호출하면 무조건 false를 반환합니다.
/***********************************************************************
const hasNegCycle = edges.some((e) => {
    const [from, to, weight] = e;
    if (dist[to] !== INF && dist[to] + weight < dist[from]) {
      return true;
    }
  });
***********************************************************************/

let num = 5;
// let edges = [
//   [1, 2, -1],
//   [1, 3, 4],
//   [2, 3, 3],
//   [2, 4, 2],
//   [2, 5, 2],
//   [4, 2, 1],
//   [5, 4, -3],
// ]; // 시간복잡도 O(5 * 7)
let edges = [
  [1, 2, 2],
  [2, 3, 3],
  [2, 5, 1],
  [3, 4, -4],
  [4, 2, -1],
]; // 시간복잡도 O(5 * 5)
let start = 1;
let output = BellmanFord(num, edges, start);
console.log(output); // --> [0, -1, 2, -2, 1]
