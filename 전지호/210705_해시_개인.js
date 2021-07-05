function solution(clothes) {

    debugger;

    return Object.values(clothes.reduce((obj, t) => {
        //! 풀이
        //? 1. 우선 Object.values 는 객체의 값들만 가져옴
        //? 1-1. 현재 reduce 의 기본값은 {} 로 정해져 있기에 obj 에 {} 가 들어옴
        //? 1-2. t[1] 에는 각 옷의 종류가 들어있음
        //? 1-3. obj[headgear] = 만약 이미 headgear 라는 키가 있다면 갯수를 1 더해줌, 없다면 갯수를 1로 설정
        //? 1-4. reduce 가 끝나면 각 옷 종류로 만들어진 키와 옷 종류의 갯수가 value 로 들어옴
        /*
            *obj = {
                *headgear: 2,
                *eyewear: 1,
            *};
        */
        obj[t[1]] = obj[t[1]] ? obj[t[1]] + 1 : 1;
        return obj;

        //? 2. return 되는 obj 는 위의 예시상태이다.
        //? 2-1. 그 후에 obj 를 가지고 reduce 를 또 해줌
        //? 2-2. Object.values 는 배열을 return 해주기에 reduce 가 가능하다.
        //? 2-3. Object.values = [2, 1] 과 같으며
        //? 2-4. [2, 1].reduce 를 실행해준것
        //? 2-5. reduce 의 초기값은 1 로 설정 되어있음 a 는 1 부터 시작한다.
        //? 2-6. 밑의 식은 현재 문제에서의 경우의 수를 구하는 공식이다.
        //? 2-7. -1을 해주는 이유는 아무것도 입지 않았을때의 경우의 수를 없애주기 위함
    }, {})).reduce((a, b) => a * (b + 1), 1) - 1;
}