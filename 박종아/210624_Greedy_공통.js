// * https://programmers.co.kr/learn/courses/30/lessons/42861?language=javascript

// TODO 수도코드
/***********************************************************************
 1. 비용이 제일 낮은 순을 정리한다. costs[i][2] -> 비용
 2. 방문한 섬을 false 배열로 만들어 체크한다.
 3. 모두 방문할 때까지 for문이 반복하여 돈다.
 4. for문 안의 break를 이용하여 해당 조건맞는 것만 찾고 다시 for문을 돌린다.
 5. 섬1만 방문했거나 섬2만 방문했을 경우, 방문 섬과 연결을 true한다.
***********************************************************************/

// ! 섬1과 섬2가 같이 들어가는 경우는 가장 낮은 비용밖에 없다.
// ! 그외에도 섬1과 섬2가 같이 들어간다면 서로 연결이 안 될 수 있다.
// ! 무조건 연결되기 위해 섬1만 혹은 섬2만 방문했을 경우를 조건으로 한다.

function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);

  const visited = new Array(n).fill(false);

  let answer = 0,
    vis = 0;

  // 가장 낮은 비용 할당한다.
  visited[costs[0][0]] = true;
  visited[costs[0][1]] = true;
  answer += costs[0][2];

  // 방문한 섬의 수가 모두 true면 vis과 섬의 수 n이 같아진다.
  while (vis < n) {
    for (let i = 0; i < costs.length; i++) {
      const [island1, island2, cost] = costs[i];

      if (
        (!visited[island1] && visited[island2]) ||
        (visited[island1] && !visited[island2])
      ) {
        visited[island1] = true;
        visited[island2] = true;
        answer += cost;
        // 해당 조건에 맞는 것을 찾으면 다시 for문을 돌려 비용 낮은 순으로 다시 조회한다.
        break;
      }
    }
    vis = visited.filter((el) => el === true).length;
  }
  return answer;
}

let n = 5;
let costs = [
  [0, 1, 5],
  [1, 2, 3],
  [2, 3, 3],
  [3, 1, 2],
  [3, 0, 4],
  [2, 4, 6],
  [4, 0, 7],
];
let output = solution(n, costs);
console.log(output);
