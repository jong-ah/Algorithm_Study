function solution(number, k) {
    // 아.. 저장안해서 적어놓은 수도코드 다 날아갔다.

    // 내가 생각했던 방법
    // 큰 틀
    // 1. 먼저 number 에서 k 만큼 잘라낸 string 을 배열에 숫자 형태로 바꾸어 넣어준다.
    // 2. 그리고 배열의 인자에서 Math.max 를 사용하여 최댓값을 result 에 넣어줌
    // 3. result 를 string 으로 바꾸어서 return

    // 세부사항
    // 1. '1234' 에서 2개씩 잘라낸다는 가정
    // 1-1. [0, 1, '34'], [0, 2, '24'], [0, 3, '23'], [1, 2, '14'], [1, 3, '13'], [2, 3, '12'];
    // 1-2. 결과적으로 [12, 13, 14, 23, 24, 34] 가 나온다.
    // 1-3. 위의 규칙을 살펴보면 첫 기준은 그대로 고정하고 잘라내는 지점을 + 1씩 해주어서 탐색을 해준다.
    // 1-4. 3개씩 잘라낸다는 가정
    // 1-5. [0, 1, 2, '4'], [0, 1, 3, '3'], [0, 2, 3, '2'], [1, 2, , '1'];
    // 1-6. 항상 맨 끝의 반복만 올라가고 나머지 숫자는 고정시킨뒤에 맨 끝의 숫자가 length 와 같아지면
    // 1-7. 그 전의 숫자를 증가시킨다.

    const result = [];

    let head = 0
    let del = k

    // result 에 먼저 string 의 맨 앞부분을 넣어줌 그 뒤에 head 의 숫자를 1 증가시킴.
    result.push(number[head++]);

    // 반복의 조건
    // 1. number 가 = '1234', k 가 = 2 라고 가정했을때
    // 1-1. result의 length 가 number.length(4) - k(2) 보다 작은 동안
    // 1-2. 즉, result.length < 2
    // 2. head 가 number 의 length 보다 작을 동안
    // 2-1. 즉, head < 4 가 된다.
    while (result.length < number.length - k || head < number.length) {

        debugger;

        // 1. del 에는 현재 잘라낼 갯수가 들어가있다.
        // 1-1. 조건문 내부를 살펴보니 del-- 를 해주고 있는 것으로 보아
        // 1-2. if 문내에서 del 이 0 이되면 false 이므로 조건이 종료되는듯 하다.
        // 2. result의 마지막원소가 number의 head 부분 원소보다 작다면
        // 2-1. 현재는 result[0] = '1' < number[1] = '2' 가 된다.
        // 3. 애초에 result 의 length 가 0 이라면 조건문에 진입하지 않는다.
        if (del && result[result.length - 1] < number[head]) {

            // 1. 조건이 성립된다면 result.pop() 을 해준다.
            // 2. del 은 2 - 1 = 1 이된다.
            // 3. 그리고 continue, 즉 밑의 코드를 실행하지 않고 다시 while 문 내부의 위부터 시작
            result.pop();
            del--;
            continue;
        }

        // 1. 조건이 성립되지 않았다면
        // 2. result 에 number[1++] 을 해준다.
        // 2-1. result.push('2') 를 해준다.
        result.push(number[head++]);
    }

    // 현재 result 에 담긴 수 중에서 가장 큰 수가 return 된다.
    return result.slice(0, number.length - k).join('')
}

// debugger 를 찍어본 결과
// 1. 굳이 Number 로 변환을 하지 않아도 숫자 각 1 개를 비교하는 것이기에
// 1-1. 값의 비교가 가능했다. 이유는 아스키코드 때문인듯
// 2. 만약 result 에 현재 들어와있는 값이 다음 비교할 number[head] 보다 값이 작다면
// 3. 있을 필요가 없다. pop 으로 데이터를 제거해주고 del 을 -- 시키는 이유는
// 3-1. 이미 글자 하나를 잘라준것과 마찬가지로 판단하여 잘라줄 글자의 갯수를 줄여준것이다.
// 4. 그리고 result 가 비어있다면 다음 number 의 인덱스의 데이터를 push 해준다.
// 5. 만약 result 의 값이 다음 number 의 인덱스보다 크다면 조건문을 그냥 넘어가고 result 에 push 해서
// 5-1. 글자를 이어붙여준다. ex) result = ['9'] 상태라면, result = ['9', '2'] 로 만들어준다.
// 5-2. 이렇게 이어붙여진 글자에서 만약 del 이 0 이라면 조건문에 들어가지 않게 되고
// 5-3. 그 뒤로 글자를 쭉 이어 붙여준다.
// 6. 글자 수는 거의 정확하게 맞아떨어져 들어오게된다. 마지막 return 에서 join 으로 string 들을 다시 이어붙여줌
// 7. 이렇게 푸는 방식이 있는지 한 번 찾아봐야겠다.