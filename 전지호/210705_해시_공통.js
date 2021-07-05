function solution(genres, plays) {
    //! 문제
    //? 1. 장르 별로 가장 많이 재생된 노래를 두 개씩 모음
    //? 2. 속한 노래가 많이 재생된 장르를 먼저 수록
    //? 3. 장르 내에서 많이 재생된 노래를 먼저 수록
    //? 4. 장르 내에서 재생 횟수가 같으면 고유 번호가 낮은 노래를 먼저 수록

    //! 수도 코드
    //? 1. 그렇다면, 일단 장르 별로 나눠서 장르들의 재생 총합을 먼저 따진다.
    //? 2. 해시를 이용해서 풀어야기에, 장르별로 객체를 만들어서 나누고,
    //? 2-1. 각각 배열에서 가지고 있던 인덱스 번호와 재생 횟수를 저장한다.
    //? 2-2. 일단 먼저 객체를 생성한 후에 위의 조건들을 돌려줄까?

    //? 해시 생성
    let hash = {};
    let result = [];

    //? 객체 키 생성
    for (let i = 0; i < genres.length; i++) {
        hash[genres[i]] = {
            values: [],
            sum: 0,
        };
    }

    //? 객체 키에 맞는 값 넣어주기
    for (let i = 0; i < genres.length; i++) {
        if (hash[genres[i]]) {
            hash[genres[i]].values.push([i, plays[i]]);
        }
    }

    //? 먼저 장르 내에서 많이 재생된 노래를 먼저 정렬함
    //? 장르 내에서 재생 횟수가 같은 노래는 인덱스 번호가 낮은 노래를 먼저 수록
    for (let key in hash) {
        for (let i = 0; i < hash[key].values.length; i++) {
            hash[key].values.sort((a, b) => {
                //? 재생 횟수가 같으면 인덱스 번호가 낮은 순으로 오름차순 정렬
                if (a[1] === b[1]) {
                    return a[0] - b[0];
                }

                //? 재생 횟수가 높은 순으로 내림차순 정렬
                return b[1] - a[1];
            })
        }
    }

    //? Sum 에는 총합을 저장
    for (let key in hash) {
        let sum = 0;

        for (let i = 0; i < hash[key].values.length; i++) {
            sum += hash[key].values[i][1];
        }

        hash[key].sum = sum;
    }

    //? sum 순서로 정렬
    let sortObj = [];

    for (let key in hash) {
        sortObj.push([key, hash[key]]);
    }

    sortObj.sort((a, b) => {
        return b[1].sum - a[1].sum;
    });

    //? result 에 값 넣어주기
    for (let i = 0; i < sortObj.length; i++) {
        for (let j = 0; j < sortObj[i][1].values.length; j++) {
            if (j > 1) {
                break;
            }

            result.push(sortObj[i][1].values[j][0]);
        }
    }

    return result;
}