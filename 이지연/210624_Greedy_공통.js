// 예시 let n=4, costs=[[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]

//! greedy로 문제를 풀어야하니까
// 1. 최소비용을 리턴하기 위해서는 다리를 연결하는 데 드는 비용의 순으로 정렬하고
// 2. 모든 섬이 연결될 때까지 반복한다.  


function solution(n, costs) {

    // 다리를 건설하는데 드는 총 비용을 리턴한다. 
    var answer = 0;

    // 최소비용을 찾기 위해 건설비용을 기준으로 costs를 정렬한다. 
    const sortedCosts = costs.sort((a,b) => a[2]-b[2]);

    // 모든 섬이 연결됐는지의 여부를 확인하기 위해서 각 섬의 번호를 담은 배열을 하나 만들어 놓고
    const arr = new Array(n).fill(0).map((el, i) => i);
    
    // 각 섬의 연결여부를 확인할 수 있는 함수를 만든다. 
    function connect (from, to) { // 전달인자로 시작점(from)과 도착점(to)으로 두 개를 놓고()
        for(let i=0; i<arr.length; i++) { // arr를 순회해서 
            if(arr[i] === to) { // arr[i]를 확인했을 때 도착점과 같으면 arr[i]를 from으로 채운다
                arr[i] = from
            }
        }
        //! 연결이 다 되면 arr는 [from, from, ...., from] 처럼 from으로 채워지면 더이상 비용을 더하지 않는다. 
    }
    
    sortedCosts.forEach(el => { // sortedCosts의 각 요소에 대해서 각각 실행할 수 있도록 forEach() 메소드를 사용해서
        if(arr[el[0]]!== arr[el[1]]) {  // 출발점과 도착점이 같지 않으면 다리를 건설해야하므로 비용을 더한다. 
            answer += el[2]
            connect(arr[el[0]], arr[el[1]])  // 연결이 되면 불필요한 연결을 막기 위해서 앞서 구현해둔 connect함수를 호출해서 arr배열을 from으로 채운다.
        }
    })

    return answer;  
}


//! greedy에서는 이전의 선택으로는 절대 돌아가지 않는다. 
//! 각 단계마다 최적의 선택을 추구하되, 일단 선택하면 과거의 선택을 되돌아보지 않는다.


//? greedy의 알고리즘 문제유형
// 1. 배낭 문제 => 코플릿 15번 짐나르기 
// 2. 외판원 문제
// 3. 집합커버링 문제