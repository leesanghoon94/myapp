/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function (fn, args, t) {
  fn(...args);
  let timer = setInterval(() => {
    fn(...args);
  }, t);

  let cancleFn = () => clearInterval(timer);
  return cancleFn;
};

console.log(cancellable);

let time = function () {};
time.prototype.set = function (key, value, duration) {};

let objj = { x: 5, y: 42 };
let a = objj.hasOwnProperty("x");
console.log(a);

const pet = { name: "sopt", age: 3 };

console.log(pet.age);
console.log(pet["age"]);
console.log(pet["AGE".toLowerCase()]);

const name = "sugar";
console.log({ name: name, age: 3 });
console.log({ name, age: 3 });

let newa = Array.from(pet);
console.log(newa);

const arr = [1, 2, 3, 4, 5];

const addArr = [6, 7];

let aaaaaaa = arr.push(addArr);
console.log(arr.slice(1, 2));

function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

console.log(gcd(2, 10));
console.log(12 % 5);

let array = [{ id: "1" }, { id: "1" }, { id: "2" }];

let fn = function (item) {
  return item.id;
};
console.log("---------------");

console.log(fn(array[0]));
let fn2 = function (list) {
  return String(list[0]);
};

let fn3 = function (n) {
  return String(n > 5);
};

console.log(fn({ id: "1" }, { id: "1" }, { id: "2" }));

console.log(
  fn2([
    [1, 2, 3],
    [1, 3, 5],
    [1, 5, 9],
  ])
);

console.log(fn3(JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])));

console.log(typeof typeof 1);

console.log("----------");

let group = {};
let key = fn({ id: 1 });
if (!group[key]) {
  group[key] = [];
}
console.log(group);
console.log(group[1].push({ id: 1 }));

console.log(group[1][0]);
