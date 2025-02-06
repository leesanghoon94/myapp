/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
var argumentsLength = function (...args) {
  console.log(...args, [...args]);
  return args.length;
};

/**
 * argumentsLength(1, 2, 3); // 3
 */

let a = argumentsLength(1, 2, 3);
console.log(a);
