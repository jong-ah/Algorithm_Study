//? 프로그래머스 레벨2 H-index

    //= Test Case [1, 3, 5, 7, 9, 11], 4


    //! H-index를 구하는 방법
    // 자신이 저널에 등재한 전체 논문중 많이 인용된 순으로 정렬한 후, 피인용수가 논문수와 같아지거나 피인용수가 논문수보다 작아지기 시작하는 숫자가 바로 나의 H-index
    // 인자로 주어진 citations를 내림차순으로 정렬하고 배열을 순회해서 인덱스의 값(=논문의 수 - 1)과 요소의 값(=피인용수)를 비교해서 
    // 1. 피인용수가 크거나 같다면 결과값이 1증가
    // 2. 피인용수가 작다면 순회를 종료
    // 결과값을 반환해서 H-index를 구할 수 있다. 


    function solution(citations) {
        
        var answer = 0;
        let arr = citations.sort((a,b)=> b-a)
        
        for(let i=0; i < arr.length; i++) {
            if(arr[i] >= i+1 ) {
                answer++
            } else {
                break;
            }
        }
        return answer
    }


//* H-index(허쉬지표)
// 연구자의 연구생산성과 영향력을 알아보기 위한 지표
// 어떤 연구자의 H-index는 그 사람이 쓴 모든 논문 중 n회이상 인용된 논문이 n개 이상일 때, 이 둘을 동시에 만족하는 n의 최대값으로 한다. 