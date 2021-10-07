'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/1844?language=javascript

// TODO 게임 맵 최단거리
/*********************************************************************** 
input으로 캐릭터가 이동한 방향을 string으로 준다.
output으로 캐릭터가 처음 걸어본 길의 길이를 number로 출력한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 그래프 탐색 DFS(깊이 우선 탐색), BFS(너비 우선 탐색) 중에서 최단거리를 구하기 위해 BFS를 이용해서 푼다.
2. 시작점이 0,0이고 count1로 시작한다.
3. 도착점은 maps의 x,y의 맨 끝의 자리이다.
4. 움직이는 상하좌우를 저장한 move를 만든다.
5. BFS 함수에서 queue를 활용해 현재 있는 위치와 count를 넣고, move로 현재 위치를 옮긴 값이 maps을 벗어나지 않았는지, 방문하지 않은 곳인지 확인한다.
6. 조건에 맞다면 방문해서 1 -> 0 으로 바꾸고, 방문한 위치와 count++를 queue에 넣는다.
7. 이를 반복하여 방문한 위치가 도착점과 같을 때 count를 리턴하고
8. 방문할 곳이 없어 queue 안에 값이 없을 때엔 return하여 초깃값 -1을 출력한다.

* visited 배열을 따로 만들 필요없이 방ㅁ운한 장소를 벽의 표시인 0으로 바꾸면 된다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 BFS의 영향을 받아 최대로 모든 노드를 방문한다고 한다면  O(m * n)이 될 것이다.
 * 개선하게 된다면 나는 move로 만들었는데 따로 dx, dy 2배열을 만든 사람들이 많다. 이것이 덜 들어가기 때문에 더 복잡도가 낮을거같다.
 * 가독성은 move이 더 좋지 않을까..?
 ***********************************************************************/

function solution(maps) {
  let answer = -1;
  const n = maps.length - 1;
  const m = maps[0].length - 1;
  const move = [
    [-1, 0], // L
    [1, 0], // R
    [0, 1], // U
    [0, -1], // D
  ];

  function BFS(nowX, nowY, nowCnt) {
    const queue = [];
    queue.push([nowX, nowY, nowCnt]);
    maps[nowX][nowY] = 0;

    while (queue.length) {
      const [x, y, cnt] = queue.shift();
      if (x === n && y === m) {
        return (answer = cnt);
      }
      for (let i = 0; i < 4; i++) {
        let nextX = x + move[i][0];
        let nextY = y + move[i][1];
        if (nextX < 0 || nextY < 0 || nextX > n || nextY > m) continue;
        if (maps[nextX][nextY] === 1) {
          maps[nextX][nextY] = 0;
          queue.push([nextX, nextY, cnt + 1]);
        }
      }
    }
    return;
  }

  BFS(0, 0, 1);
  return answer;
}

let maps = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
];
let output = solution(maps);
console.log(output);
