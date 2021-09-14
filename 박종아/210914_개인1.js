'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/86048

// TODO 입실 퇴실
/*********************************************************************** 
input은 들어온 사람의 배열(enter)과 나간 사람의 배열(leave)이며 들어온 순서대로 나가지 않았을 경우, 뒷사람과 만나게 됩니다.
output은 들어온 사람이 몇 명의 사람과 만나게 되었는지의 수가 담긴 배열입니다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. room을 만들어 들어오는 사람이 있을 때, room안의 2명 이상있으면 answer에 추가했다.
2. 틀리지 않으나 시간 초과가 걸린다.
3. 시간 초과 걸리는 것이 indexOf, includes, splice, map이 있을 것 같다.
4. indexOf, splice, includes를 없애기 위해 room을 모든 배열을 체크할 수 있게 만들었다. (불통2)
5. 그러나 여전히 같은 통과율을 보였다.
6. 추가로 더 생각해 볼 게 filter, map부분으로 들어올 때마다 answer을 재할당해줘서 그럴 수 있다.
7. 그러나 떠날 때 체크하기엔 그래도 똑같이 answer을 재할당해줘야 한다. (떠난 사람과 들어온 사람들을 동시엔 만난 사람이 있다.)
8. 더 생각해봐야지...
***********************************************************************/

// ! 23.5 통과, 나머지 시간 초과
function 불통1() {
  function solution(enter, leave) {
    // 번호 순대로 사람 만난 결과값
    let answer = new Array(enter.length).fill(0);
    // 배열마다의 순서
    let enterIdx = 0,
      leaveIdx = 0;
    // 만난 장소, 처음 들어온 사람 초기값으로 할당
    let room = [enter[0]];

    while (leaveIdx < leave.length) {
      if (room.includes(leave[leaveIdx])) {
        let deleteIdx = room.indexOf(leave[leaveIdx]);
        room.splice(deleteIdx, 1);
        leaveIdx++;
      } else {
        if (!room.includes(enter[enterIdx])) {
          room.push(enter[enterIdx]);
        }

        if (room.length > 1) {
          room.map((el) => {
            answer[el - 1] = Math.max(room.length - 1, answer[el - 1] + 1);
          });
        }
      }
      if (enterIdx + 1 < enter.length) enterIdx++;
    }

    return answer;
  }

  // let enter = [1, 3, 2];
  // let leave = [1, 2, 3];
  let enter = [1, 4, 2, 3];
  let leave = [2, 1, 3, 4];
  let result = solution(enter, leave);
  console.log(result);
}

불통1();

// ! indexOf를 없애보았으나 똑같이 23.5
function 불통2() {
  function solution(enter, leave) {
    if (enter.length === 1) return [0];

    // 번호 순대로 사람 만난 결과값
    let answer = new Array(enter.length).fill(0);
    // 배열마다의 순서
    let enterIdx = 0,
      leaveIdx = 0;
    // 만난 장소, 처음 들어온 사람 초기값으로 할당
    let room = new Array(enter.length + 1)
      .fill(-1)
      .map((el, idx) => (idx === enter[0] ? enter[0] : el));

    while (leaveIdx < leave.length) {
      if (room[leave[leaveIdx]] !== -1) {
        room[leave[leaveIdx]] = -1;
        leaveIdx++;
      } else {
        if (room[enter[enterIdx]] === -1) {
          room[enter[enterIdx]] = enter[enterIdx];
        }

        let inRoom = room.filter((el) => el !== -1);
        if (inRoom.length > 1) {
          inRoom.map((el) => {
            answer[el - 1] = Math.max(inRoom.length - 1, answer[el - 1] + 1);
          });
        }
      }
      if (enterIdx + 1 < enter.length) enterIdx++;
    }

    return answer;
  }

  // let enter = [1, 3, 2];
  // let leave = [1, 2, 3];
  let enter = [1, 4, 2, 3];
  let leave = [2, 1, 3, 4];
  let result = solution(enter, leave);
  console.log(result);
}

불통2();
