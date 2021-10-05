'use strict'; 

// * https://urclass.codestates.com/codeproblem/efe1080f-813e-4e80-9376-3909da16d4f8

// TODO 0-1Knapsack
/*********************************************************************** 
input으로 가방 안에 들어갈 무게(weight)를 나타내는 정수와 무게과 가치가 담긴 아이템 배열이 주어진다. 
output으로 배낭에 담을 수 있는 최대 가치를 리턴해야한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
1. 무게를 서로 비교한다는 생각은 했는데 어떻게 비교할지 잘 몰랐다.
2. 2개의 비교 배열을 만들고, 그 비교 배열의 가치를 넣어가며 비교한다.
3. possible과 cached의 차이점을 잘 아는 것이 중요하다.
3-1. possible은 이중for문으로 돌 때마다 전체 배열을 값을 바꾼다
3-2. cached는 possible 이중for문 돌기 전의 전체 배열이다.
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 forEach와 for문의 영향을 받아 O(큰 무게를 뺀 weight * (weight+1))일 것 같다.
 * 개산할 점은 forEach 안의 for문을 함수로 따로 빼면 시간복잡도가 줄어들지 않을까 생각한다.
 ***********************************************************************/

const knapsack = function (weight, items) {
  // TODO: 여기에 코드를 작성합니다.
  // weight 크기만큼의 가치를 담을 배열
  let cached = Array(weight + 1).fill(0);

  // weight보단 큰 무게는 뺀다.
  let weightPass = items.filter((el) => el[0] <= weight);
  //  console.log(weightPass);

  // cached 채워넣기
  weightPass.forEach(([wt, v]) => {
    // cached랑 비교할 possible 배열
    // 비교해서 가치를 합하는지 확인한다.
    const possible = Array(weight + 1).fill(0);
    for (let i = 1; i <= weight; i++) {
      // possible에 새로운 가치와 잘 비교되게 한다.
      possible[i] = cached[i];
      // wt보다 같거나 크면 가치를 넣는다. && 넣을 가치(가치의 합)가 이전 가치(합치기 전)보다 크면 넣는다.
      if (i - wt >= 0 && cached[i - wt] + v > cached[i])
        possible[i] = cached[i - wt] + v;
      // console.log(possible)
      // 이전에 넣은 가치가 크다면 이전 가치로 재할당한다.
      if (cached[i - 1] > cached[i]) possible[i] = cached[i - 1];
    }
    // cached에 재할당해야지 비교할 수 있다.
    cached = possible;
  });

  return cached[weight];
};

let weight = 10;
let items = [
  [3, 60],
  [4, 100],
  [5, 120],
];
let output = knapsack(weight, items);
console.log(output); // --> 220 (items[1], items[2])
