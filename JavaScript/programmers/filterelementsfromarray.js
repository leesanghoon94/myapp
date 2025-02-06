/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  let filterArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      filterArr.push(arr[i]);
    }
  }
  return filterArr;
};

let a = filter([0, 11, 20, 30], function greaterThan10(n) {
  return n > 10;
});
console.log(a);
