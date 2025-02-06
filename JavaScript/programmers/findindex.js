const arr = [10, 20, 30, 40];

const test = arr.findIndex((value) => {
  console.log(this, this.value); // 중괄호로 묶어서 여러 문장을 처리
  return value > 20;
});

console.log(test); // 2

//////////

const context = {
  thredhold: 20,
};

const test2 = arr.findIndex(function (value) {
  console.log(this); // `this`는 이제 `context`를 참조
  return value > this.thredhold;
}, context);

console.log(test2); // 2

///////
const 배열 = [
  { num: 9, name: "아홉" },
  { num: 10, name: "열" },
  { num: 11, name: "열하나" },
  { num: 12, name: "열둘" },
];

function 십보다큰(arr) {
  console.log(this);

  return arr.num > 10;
}

let 테스트1 = 배열.find(십보다큰);

console.log(테스트1); // {num: 11, name: '열하나'}

//thisArg에 this값 바꿔주기

function 십보다큰2(arr) {
  console.log(this);
  return arr.num > this;
}

let 테스트2 = 배열.find(십보다큰2, 10);

console.log(테스트2); // 10 보다큰 {num: 11, name: '열하나'}

// 문자열을 This로 전달

console.log(typeof 배열[2].name);

function 십보다큰3(arr) {
  console.log(this);
  return arr.name == this;
}

let 테스트3 = 배열.find(십보다큰3, "열하나");
console.log(테스트3);

function greaterThan10(value) {
  console.log(this);
  return value > 10;
}

let filtered = [12, 5, 100, 23].filter(greaterThan10);
console.log(filtered);

let fillterd2 = [12, 5, 100, 23].filter(greaterThan10, 10);
console.log(fillterd2);
