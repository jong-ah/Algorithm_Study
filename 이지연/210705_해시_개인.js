//? 프로그래머스 2단계 위장

    //= Test case [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]], 결과 5

    //! Point
    // 같은 종류의 의상 안에서는 한 개만 선택할 수 없다. 안경을 쓰고 선글라스를 쓸 수는 없다
    // 조합을 구할 때는 선택하지 않는 경우도 고려해야 한다. 
    // 만약 종류A가 a개 있고 종류B가 b개 있다면 조합을 하기 위해 각각을 선택하는 경우의 수를 구하면 선택하지 않는 경우도 포함하여 각각 a+1, b+1이 되고 
    // 최종적으로 구할 수 있는 조합은 (a+1)*(b+1) - 1 이다. 
    // 여기에서 -1을 하는 이유는 아무것도 선택하지 않는 경우를 제외하기 위함이다.

    function solution(clothes) {
        var answer = 0;
        
        // 의상의 종류 별로 각각 몇 개를 가지고 있는지 확인 하기 위하여 아래를 실행한다.   
        let kinds = []
        for(let el of clothes) {
            let idx = kinds.findIndex(kind => kind[0] === el[1])
            if(idx === -1) {
                kinds.push([el[1], 1])
            } else {
                kinds[idx][1]++
            }
        }
        
        answer = kinds.reduce((acc, cur) => acc*(cur[1]+1), 1) -1
        
        return answer
    }





//? 프로그래머스 1단계 완주하지 못한 선수

    function solution(participant, completion) {
        let answer = '';
        
        participant.sort()
        completion.sort()
        for(let i=0; i < participant.length; i++) {
            if(participant[i] !== completion[i]) {
                answer = participant[i]
                break;
            }  
        }
        
        return answer
    }