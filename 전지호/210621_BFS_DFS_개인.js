function solution(numbers, target) {

    // 총 경우의 수를 구하는 문제??

    let answer = 0;

    getAnswer(0, 0);

    function getAnswer(x, value) {

        debugger;
        // debugger 를 돌리며 확인해보니
        // 많은 수의 재귀를 반복하며.. 값을 계속해서 찾아간다..
        // 재귀를 탔을때의 최대 값부터 시작해서 그 순서의 반대로 해석해나가야함.
        // 아직 많이 부족함 좀 더 풀어야함
        // 문제를 풀어보면서 조금씩 부족한 부분을 더 찾아가고 있다.

        if (x < numbers.length) {
            // x 가 numbers 의 length 보다 작다면 x 에 1을 더해줌
            // x 가 numbers 의 length 보다 커질때까지 진행함
            // x 는 numbers 의 index 로 사용된다.

            // 또한 value 도 0 부터 시작함
            // 그리고 일단 + 연산자부터 시작해서 값을 누적해가며 재귀를 반복함
            getAnswer(x + 1, value + numbers[x]);
            getAnswer(x + 1, value - numbers[x]);
        } else {
            // x 가 numbers 의 length 보다 커졌을때
            // target 을 3 을 주었다고 가정했을때 만약 위의 과정이 반복된
            // 값이 누적된 value 가 target 과 같아진다면 answer 의 값을 1씩 올려준다.

            if (value === target) {
                answer++
            }
        }
    }

    return answer;
}