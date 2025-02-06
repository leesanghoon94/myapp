/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  return function () {
    return n++;
  };
};

const counter = createCounter(10);
counter(); // 10
counter(); // 11
counter(); // 12
console.log(counter()); // 10
console.log(counter()); // 11
console.log(counter()); // 12

// thisArg 사용 예시
let arr = [1, 2, 3];
let context = { multiplier: 10 };

arr.flatMap(function (value) {
  return [value * this.multiplier]; // this는 context를 참조함
}, context);
// 결과: [10, 20, 30]

// thisArg 없이
arr.flatMap(function (value) {
  return [value * 10]; // 고정된 값 10 사용
});
// 결과: [10, 20, 30]

console.log(arr.push((n) => n + 1, 1));

/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  let result = []; // 새로운 배열을 생성
  for (let i = 0; i < arr.length; i++) {
    // arr 배열을 순회
    result.push(fn(arr[i], i)); // arr[i]와 i를 fn 함수에 전달하고 그 값을 result 배열에 추가
  }
  return result; // 결과 배열 반환
};
