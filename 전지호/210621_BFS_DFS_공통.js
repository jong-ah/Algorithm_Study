let arr;
let visitArr;

// 처음에 문제를 해석하느라 힘들었지만.. 계속 읽다보니 해결이 되는..
// 사실 내가 직접 다 푼 것은 아니고 풀다가 뇌정지와서 다른사람들이 푼 코드를 보고
// 그 코드를 풀어내는데에 시간을 할애했다.
// 아직까지 여러 유형의 알고리즘들은 어떤 방식으로 풀면된다는 생각이 머리 속에 각인은 되어있지 않지만.
// 이번 스터디를 계속 진행하면서 여러 문제들을 풀다보면 음.. 점점 감이 잡히지 않을까 싶다.
// 아직까진 뭔가 머리속에 구상이 잘 안된다. 확실히 재귀쪽으로 가다보니.. 내 머리속에서 계산이 안되서 그런걸까.. 흑흑
// debugger 를 활용하여 값을 비교하면서 분석을 했다.
// 그래도 풀이는 되어서 다행이다..
// 다음에는 level 2 짜리 BFS, DFS 를 풀어봐야겠다.

function solution(n, computers) {
    let count = 0;

    arr = computers;

    visitArr = new Array(n).fill(false);

    for (let i in arr) {
        count += dfs(i);
    }

    return count;
}

// 배열의 인덱스 번호만으로 순서를 결정하였고 만약에 해당하는 인덱스의 배열데이터 값이 1이라면
// dfs 로 계속 보내주면서 visitArr 의 true 여부를 파악하여 true 라면 이미 갔다온 곳이기에 return 0로 dfs 를 끝내준다.
// 결국 반복이 돌고 돌아서 dfs 의 모든 순회가 끝이난다면 return 1을 해주며 count 에 값을 더해준다.
// 모든 순회가 끝나고 최종적으로 count 에 남게 되는 값이 최종적으로 네트워크의 갯수가 된다.

function dfs(i) {
    if (visitArr[i] === true) return 0;
    else visitArr[i] = true;

    for (let j in arr[i]) {
        if (arr[i][j] === 1)
            dfs(j);
    }

    return 1;
}