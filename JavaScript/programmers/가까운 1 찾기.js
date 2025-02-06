let arr = [0, 0, 0, 1];
let idx = 1;

const solution = (arr, idx) => arr.indexOf(1, idx);

console.log(solution(arr, idx));

function solution2(arr, idx) {
  return arr.findIndex((v, i) => idx <= i && v === 1);
}

console.log(solution2(arr, idx));

class 붕어빵틀 {
  constructor(팥, 크림) {
    this.팥 = 팥;
    this.크림 = 크림;
  }

  굽다() {
    console.log(`${this.팥},${this.크림} 붕어빵을 굽습니다.!`);
  }
}
