'use strict';

// * https://urclass.codestates.com/codeproblem/28b64d6f-c831-4985-b617-17a536ffc671

// TODO 플로이드-와샬 알고리즘
/*********************************************************************** 
플로이드-와샬 알고리즘은 모든 각각의 정점을 출발점으로해서 모든 정점까지의 최단경로를 구하는 알고리즘이다.
다익스트라 알고리즘을 모든 시작점에서 시작해 다른 정점까지 반복문으로 돌린다.

* 다익스트라 알고리즘은 하나의 정점을 출발점으로해서 모든 정점까지의 최단 경로를 구하는 알고리즘이다.
distance[a][c]>distance[a][b]+distance[b][c] 가 성립한다면
distance[a][c]=distance[a][b]+distance[b][c];

* 참고자료
- [플로이드 와샬 알고리즘](https://taesung1993.tistory.com/50)
- [플로이드, 다익스트라 알고리즘 비교](https://codedoc.tistory.com/95)
- [최단 경로 알고리즘](https://velog.io/@ehdrms2034/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%B5%9C%EB%8B%A8-%EA%B2%BD%EB%A1%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%8B%A4%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%9D%BC-%EB%B2%A8%EB%A7%8C-%ED%8F%AC%EB%93%9C-%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 문제 읽다가 플로이드-와샬 알고리즘을 몰라 알아보고 풀었다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 모든 각각의 경로에 대한 최단경로를 구하기 때문에 O(N³)이다 (N:정점의 수)
 * 개선하게 된다면, 코드로는 잘 모르겠고, 최단 경로 알고리즘인 다익스트라, 벨만포드와 함께 비교하여 잘 기억해야겠다.
 ***********************************************************************/

// 정점간의 거리를 확인할 수 있는 matrix를 만든다.
function createGraphByMatrix(num, edges) {
  const matrix = [];
  // 거리가 100이하라고 했음으로 101로 잡는다. (or Number.MAX_SAFE_INTEGER)
  const INF = 101;
  for (let i = 0; i <= num; i++) {
    matrix.push(Array(num + 1).fill(INF));
    matrix[i][i] = 0;
  }
  edges.forEach(([src, dst, weight]) => {
    matrix[src][dst] = weight;
  });
  return matrix;
}

function FloydWarshall(num, edges) {
  const dist = createGraphByMatrix(num, edges);

  // 거리가 기존의 시작 정점과 끝 정점간이 가까운지,
  // 중간지점을 거친게 가까운지 비교한다.
  // 중간지점은 모든 정점을 다 넣어 확인한다.
  for (let stopover = 1; stopover <= num; stopover++) {
    for (let src = 1; src <= num; src++) {
      for (let dst = 1; dst <= num; dst++) {
        dist[src][dst] = Math.min(
          dist[src][dst],
          dist[src][stopover] + dist[stopover][dst]
        );
        // if (dist[src][stopover] + dist[stopover][dst] < dist[src][dst]) {
        //     dist[src][dst] = dist[src][stopover] + dist[stopover][dst];
        //   }
      }
    }
  }

  // console.log(dist)

  const INF = 101;
  const nulled = dist.map((row) =>
    row.map((col) => {
      if (col === INF) return null;
      else return col;
    })
  );

  // 정점 0이 없기 때문에 없앤다.
  return nulled.slice(1).map((row) => row.slice(1));
}

let num = 4;
let edges = [
  [1, 2, 6],
  [1, 4, 9],
  [2, 1, 8],
  [2, 3, 10],
  [3, 1, 3],
  [3, 4, 5],
  [4, 3, 4],
];
let output = FloydWarshall(num, edges);
console.log(output); // -->
// [
//   [0, 6, 13, 9],
//   [8, 0, 10, 15],
//   [3, 9, 0, 5],
//   [7, 13, 4, 0],
// ];
