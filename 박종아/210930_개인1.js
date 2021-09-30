'use strict';

// * https://programmers.co.kr/learn/courses/30/lessons/17680?language=javascript

// TODO 캐시
/*********************************************************************** 
input으로 캐시 크기인 정수와 도시 이름이 담긴 배열을 받는다.
output으로 입력된 도시 이름 배열을 순서대로 처리할 때, '총 실행시간'을 출력한다.
***********************************************************************/

// TODO 풀이의 흐름
/***********************************************************************
* 도시이름은 대소문자 구분을 하지 않는다.
* 캐시 교체 알고리즘은 LRU(Least Recently Used)를 사용한다.
* cache hit : 캐시 안에서 도시를 찾았을 경우, 실행시간이 1이 된다. 찾은 것은 다시 찾을 수 있으므로 맨 앞에 넣는다.
* cache miss :  캐시 안에 도시을 못 찾았을 경우, DB가서 확인해야하므로 실행시간이 5가 된고, 찾은 것은 캐시에 넣는다.
1. (예외처리) 캐시 크기가 0일 경우, 모두 DB에서 찾아야하므로 도시 배열의 길이 * 5 이다.
2. 도시 배열의 맨 앞의 값이 캐시에 있는지 확인한다
2-1. 있을 경우, 캐시 안의 순서를 맨 뒤로 옮기고 실행시간 1을 더한다. (맨 뒤가 최신 것)
2-2. 없을 경우, 캐시 배열의 길이와 캐시 크기가 같다면 맨 앞의 오래된 도시를 지운다. (맨 앞이 오래된 것)
2-2. 없을 경우, 캐시 안에 맨 앞의 값을 추가하고 실행시간 5를 더한다.
3. 도시 배열의 도시를 위와 같은 경우로 모두 확인했을 때의 실행시간(answer)을 리턴한다. 

* LRU(Least Recently Used) : 캐시에서 가장 사용한지 오래된 캐시를 지우는 알고리즘

* 참고자료
- [LRU(Least Recently Used)](https://jins-dev.tistory.com/entry/LRU-Cache-Algorithm-%EC%A0%95%EB%A6%AC)
- [캐시 메모리 구조와 캐시 히트, 미스] (https://blog.naver.com/PostView.nhn?blogId=cjsksk3113&logNo=222290234374&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView)
***********************************************************************/

// TODO 시간복잡도, 개선점
/***********************************************************************
 * 시간복잡도는 while의 영향을 받아 O(N)일 것 같다. N : cities.lenght
 * 개선하게 된다면, 왜 1이고 5를 더하는지 알 수 있게 변수를 선언했을 것이다.
 - const cacheHit = 1,  cacheMiss = 5;
 ***********************************************************************/

function solution(cacheSize, cities) {
  var answer = 0;
  let cache = [];

  if (cacheSize === 0) return cities.length * 5;

  while (cities.length) {
    const city = cities.shift().toLowerCase();
    if (cache.includes(city)) {
      cache.splice(cache.indexOf(city), 1);
      cache.push(city);
      answer += 1;
    } else {
      if (cache.length === cacheSize) {
        cache.shift();
      }
      cache.push(city);
      answer += 5;
    }
  }
  return answer;
}

let cacheSize = 3;
let cities = [
  'Jeju',
  'Pangyo',
  'Seoul',
  'NewYork',
  'LA',
  'Jeju',
  'Pangyo',
  'Seoul',
  'NewYork',
  'LA',
];
let output = solution(cacheSize, cities);
console.log(output);
