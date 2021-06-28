// https://programmers.co.kr/learn/courses/30/lessons/42627

/******* 풀이 *******
1. 현재 출력 가능한 큐인 enableJobs 생성
2. 출력 가능한 목록 중에 가장 짧은 것을 출력
*******************/

'use strict'

function solution(jobs) {
	let currentTime = 0;
	let N = jobs.length;
	let latency = 0;
	let enableJobs = [];
	
	while (jobs.length || enableJobs.length) {
		for (let i = 0; i < jobs.length; i++) {
			if (jobs[i][0] <= currentTime) {
				enableJobs.push(jobs.splice(i, 1)[0]);
				i--;
			}
		}
		
		if (enableJobs.length) {
			enableJobs.sort((a, b) => a[1] - b[1]);
			let [startedAt, time] = enableJobs.shift();
			currentTime += time;
			latency += (currentTime - startedAt);
		}
		else currentTime++;
	}

	return parseInt(latency / N);
}