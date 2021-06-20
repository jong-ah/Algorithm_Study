function solution(n, computers) {
  // n === 정점의 수, computers === 인접행렬
  // 완전 탐색으로 네트워크의 개수를 알아볼 수 있다. -> bfs, dfs

  // bfs 너비 우선 탐색
  // 1. for문으로 컴퓨터0, 컴퓨터1, ..., 컴퓨터n 모두 확인한다.
  //   1-1. 확인한 적 있는 컴퓨터는 또 확인할 필요가 없다. -> visited에 없는 것만 확인한다.
  //   1-2. 네크워트 연결이 확인된 컴퓨터는 count++ 해준다.
  // 2. 컴퓨터0부터 확인 -> getBFS 함수
  //   2-1 확인하는 컴퓨터(컴퓨터0)를 visited에 넣는다. -> 중복확인을 막기 위해
  //   2-2 네트워크 연결 확인할 컴퓨터(컴퓨터0)를 queue에 넣는다. -> 네트워크 연결 확인 전엔 컴퓨터0을 넣는다.
  // 3. queue 배열이 0으로 확인할 컴퓨터가 없을 때까지 네트워크 연결을 확인한다.
  //   3-1. 현재 확인하는 컴퓨터를 변수(currnet)로 만들어 queue.shift()를 할당한다.
  //   3-2. current와 네트워크 연결상태가 1이고 아직 확인하지 않은 컴퓨터면 visited와 queue에 추가한다.
  // 4. 컴퓨터0과 queue에 들어있는 컴퓨터들의 네트워크 연결 확인 다 완료하면 queue 배열이 0이 된다.
  //   4-1. for문으로 돌아가 count++한다.
  //   4-2. i++하고 visited에 들어있지 않은 컴퓨터의 네트워크 연결을 확인한다. -> getBFS 함수
  // 5. for문 완료하여 모든 컴퓨터를 확인했다면, 네트워크의 개수를 나타내는 count를 return한다.

  let visited = [];
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (!visited.includes(i)) {
      getBFS(i, computers, visited);
      count++;
    }
  }

  return count;
}

const getBFS = (computer, computers, visited) => {
  visited.push(computer);
  let queue = [computer];

  while (queue.length !== 0) {
    let current = queue.shift();

    for (let i = 0; i < computers[current].length; i++) {
      if (computers[current][i] === 1 && !visited.includes(i)) {
        visited.push(i);
        queue.push(i);
      }
    }
  }
};

let n = 3;
let computers = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];
let output = solution(n, computers);
console.log(output);
