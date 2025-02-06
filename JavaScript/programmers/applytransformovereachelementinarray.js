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

// Example 1
const arr1 = [1, 2, 3];
const plusone = function (n) {
  return n + 1;
};
console.log(map(arr1, plusone)); // [2, 3, 4]

// Example 2
const arr2 = [1, 2, 3];
const plusI = function (n, i) {
  return n + i;
};
console.log(map(arr2, plusI)); // [1, 3, 5]

// Example 3
const arr3 = [10, 20, 30];
const constant = function () {
  return 42;
};
console.log(map(arr3, constant)); // [42, 42, 42]
