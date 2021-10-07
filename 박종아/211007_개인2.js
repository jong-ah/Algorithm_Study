'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/12978?language=javascript

// TODO 배달
/*********************************************************************** 
input으로 마을의 수, 도로(+걸리는 시간), 1번 마을이 음식 배달 가능 시간을 배열로 준다.
output으로 1번 마을이 배달이 가능한 마을의 수를 number로 출력한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 가중치 고려하는 최단거리 구하는 방법 : 다익스트라 알고리즘
1-1. 각 노드로 가기까지의 최단 거리를 알려준다.
2. 다익스트라로 푸는 건 알겠는데 너무 길어서 다른 것을 찾아봤다.
3. 이전엔 인접행렬로 푼 적이 있는데 이것은 힙(우선순위큐)로 풀어낸 것이다.
4. adj 배열에 모든 길과 시간을 넣어두고 각 노드를 비교한다.

* 이거 다익스트라 맞나? 이거 벨만-포드 알고리즘같다.
-distance[a][c]>distance[a][b]+distance[b][c] 가 성립한다면
distance[a][c]=distance[a][b]+distance[b][c];
- 위의 것이 아니라 아래 것을 활용해서 그런가.
- u → v 최단 거리의 특성 : dist[v] <= dist[u] + w(u,v)

* 참고자료
- [다익스트라 알고리즘(Dijkstra's Algorithm)] (https://www.apexcel.blog/algorithm/graph/shortest-path/dijkstra/)
- [Array.from() MDN] (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [문제풀이] (https://msko.tistory.com/9)
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 각 정점(N) 검사하고 우선순위 큐를 활용하므로 O(N×logE) 걸린다고 한다.
 * 이해하기 쉽고, 괜찮은 코드를 보고 이해한 것이라.. 개선점은 나도 잘해보자...
 * pq를 쓰던데 이건 무슨 의미일까? 사전심사(PQ: Pre-qualification)알까?
 ***********************************************************************/

function solution(N, road, K) {
  const dist = Array(N + 1).fill(Infinity);
  const adj = Array.from({ length: N + 1 }, () => []);
  //   console.log(adj);

  road.forEach(([a, b, c]) => {
    // 양방향
    adj[a].push({ to: b, time: c });
    adj[b].push({ to: a, time: c });
  });
  //   console.log(adj);

  const pq = [{ to: 1, time: 0 }];
  dist[1] = 0;

  while (pq.length) {
    let { to, time } = pq.pop();

    adj[to].forEach((next) => {
      if (dist[next.to] > dist[to] + next.time) {
        dist[next.to] = dist[to] + next.time;
        pq.push(next);
      }
    });
  }

  //   console.log(dist);

  return dist.filter((item) => item <= K).length;
}

let N = 5;
let road = [
  [1, 2, 1],
  [2, 3, 3],
  [5, 2, 2],
  [1, 4, 2],
  [5, 3, 1],
  [5, 4, 2],
];
let K = 3;
let output = solution(N, road, K);
console.log(output);
