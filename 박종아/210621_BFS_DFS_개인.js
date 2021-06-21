function solution(begin, target, words) {
  // words의 있는 단어로 한 개의 알파벳만 바꿀 수 있다.
  // hit -> hot -> dot -> dog -> cog => 4번 바뀜
  // words 단어들을 탐색하여 바꿀지 여부를 확인해야 한다. -> dfs, bfs

  // 이게 dfs 깊이 탐색?? -> 완전 탐색 안함
  // 1. words 안에 target이 없다면 return 0 한다.
  // 2. 방문하지 않고, begin과 words 단어들 중 한글자만 다른 것을 찾는다.
  // 3. 한글자만 다른 것이 target의 글자와도 한 글자만 다르거나 같다면, visited에 true로 바꾸고 visited의 true의 글자의 수를 리턴한다.
  // 4. 2번의 경우가 아니라 begin과만 한 글자가 다르다면 그것만 visitied에 true로 바꾸고 재귀함수 getDFS로 다시 찾는다.
  // *  count를 안 하고, 완전 탐색이 아니라 바뀐 단어만 true로 visited에 표시했기 때문에 visited의 true의 수를 리턴했다.
  // *  1글자 차이나는 것을 for문을 쓰거나 함수를 따로 빼기도 한다. 이 코드에선 안 빼고 filter로 넣어 if구문이 길다.

  if (!words.includes(target)) return 0;

  let visited = new Array(words.length).fill(false);

  return getDFS(begin, words, visited, target);
}

const getDFS = (begin, words, visited, target) => {
  for (let i = 0; i < words.length; i++) {
    if (
      visited[i] === false &&
      [...words[i]].filter((el, idx) => el !== begin[idx]).length === 1
    ) {
      if (
        [...words[i]].filter((el, idx) => el !== target[idx]).length === 1 ||
        words[i] === target
      ) {
        visited[i] = true;
        visited[words.indexOf(target)] = true;
        return visited.filter((el) => el === true).length;
      }

      visited[i] = true;
      return getDFS(words[i], words, visited, target);
    }
  }
};

let begin = 'hit';
let target = 'cog';
let words = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
let output = solution(begin, target, words);
console.log(output);
