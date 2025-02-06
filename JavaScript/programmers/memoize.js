/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  let cache = {};

  return function (...args) {
    let key = JSON.stringify(args);
    console.log(key);

    if (key in cache) {
      console.log(key);

      return cache[key];
    }
    let result = fn.apply(this, args);
    cache[key] = result;

    return result;
  };
}

let callCount = 0;

const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
});
memoizedFn(2, 3); // 5
memoizedFn(2, 3); // 5
console.log(callCount); // 1
