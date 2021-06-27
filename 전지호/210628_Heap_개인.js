function solution(jobs) {
    //! 수도코드
    //? 1. 문제의 설명과 질문하기의 내용들을 봤을때
    //? 1-1. 가장 작은 소요 시간이 먼저 되야하고
    //? 1-2. 가장 오래걸리는 소요 시간이 뒤에 가면 최소값이 나옴
    //? 2. Heap 이긴 Heap 인데 음.. 이게 Heap 인지 잘 모르겠음
    let result = 0;
    let start = 0;
    let time = 0;

    // 계속 주소가 공유되서 length 가 0 이 되어서 Infinity 가 나와서
    // Slice 로 해결
    // 같은 주소를 공유하지 않게 하기 위한 slice
    let disk = jobs.slice();

    // 먼저 소요시간을 기준으로 정렬하고 소요시간이 같다면 요청 시간에 따른
    // 오름차순 정렬
    disk.sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });

    // Queue 방식으로 처리
    while (disk.length !== 0) {
        for (let i = 0; i < disk.length; i++) {

            // disk[i][0] 은 요청시간
            // disk[i][1] 은 작업 소요 시간

            //! 단순 계산식의 반복 공책에 풀어보고 규칙을 찾음
            if (disk[i][0] <= start) {
                time += start + disk[i][1] - disk[i][0];
                start += disk[i][1];
                disk.splice(i, 1);
                break;
            }

            // 요청 시간이 0 이 없을때를 대비함
            if (i === disk.length - 1) {
                start++;
            }
        }
    }

    // 계속 통과안되서 질문하기에서 테스트 케이스 가져옴
    // 가져와서 해보니.. 소수점 처리를 안해줬음 난 바보~
    result = Math.floor(time / jobs.length);
    return result;
}

//! 질문사항에서 가져온 테스트 케이스들
console.log(solution([[0, 10], [2, 10], [9, 10], [15, 2]]), 14)
console.log(solution([[0, 10], [2, 12], [9, 19], [15, 17]]), 25)
console.log(solution([[0, 1]]), 1)
console.log(solution([[0, 3], [1, 9], [2, 6]]), 9)
console.log(solution([[1000, 1000]]), 1000)
console.log(solution([[0, 1], [0, 1], [0, 1]]), 2)
console.log(solution([[0, 1], [0, 1], [0, 1], [0, 1]]), 2)
console.log(solution([[0, 1], [1000, 1000]]), 500)
console.log(solution([[100, 100], [1000, 1000]]), 500)
console.log(solution([[10, 10], [30, 10], [50, 2], [51, 2]]), 6)
console.log(solution([[0, 3], [1, 9], [2, 6], [30, 3]]), 7)