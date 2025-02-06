arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
arr.slice();

function fn(arr, n) {
  if (n === 0) {
    return arr;
  }

  let result = [];

  arr.forEach((el) => {
    if (n > 0 && Array.isArray(el)) {
      console.log("Processing:", el);
      console.log("Spread result:", ...fn(el, n - 1));
      result.push(...fn(el, n - 1));
    } else {
      result.push(el);
    }
  });

  return result;
}

JSON.stringi;
console.log(fn(arr, 1));

let nums = [13, 25, 83, 77];

function seperateDigits(nums) {
  return nums.map(function (x) {
    return (x += x);
  });
}
console.log("---------------");
seperateDigits(nums);
console.log("---------------");

let num = 123;
let str = num.toString().split("").map(Number).flat();
console.log("ㅁㅁㅁㅁ", str); // "123"

let str1 = "12";
let str2 = "34";
let test = nums.reduce((acc, cur) => {
  return acc.toString() + cur.toString();
});

let a = nums;
let b = nums.join("");
let c = nums.join("").split("");
let d = nums.join("").split("").map(Number);
console.log("----------", a);
console.log("----------", b);
console.log("----------", c);
console.log("----------", d);

let map = new Map();

console.log("---", map.set("item", 1));
console.log("---", map.clear());
console.log(map);

const obj = {};
console.log(obj);
obj.prop = 123;
console.log(JSON.parse(JSON.stringify(obj)));

///////////////
const myArray = ["zero", "one", "two"];
myArray.myMethod = function (sProperty) {
  console.log(sProperty, "-----");
  console.log(arguments.length > 0 ? this[sProperty] : this);
};

myArray.myMethod(); // "zero,one,two" 기록
myArray.myMethod(1); // "one" 기록

console.log("------------");

setTimeout(myArray.myMethod, 1.0 * 1000); // 1초 후 "[object Window]" 기록
setTimeout(myArray.myMethod, 1.5 * 1000, "1"); // 1.5초 후 "undefined" 기록
