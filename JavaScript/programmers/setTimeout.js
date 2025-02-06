// 전역 setTimeout() 메서드는 만료된 후 함수나 지정한 코드 조각을 한 번 실행하는 타이머를 설정합니다.
"use strict";
const myArray = ["zero", "one", "two"];
myArray.myMethod = function (sProperty) {
  console.log(arguments.length > 0 ? this[sProperty] : this);
};

myArray.myMethod(); // "zero,one,two" 기록
myArray.myMethod(0); // "one" 기록
myArray.myMethod(1);
myArray.myMethod(2);

setTimeout(myArray.myMethod, 1.0 * 1000); // 1초 후 "[object Window]" 기록
setTimeout(myArray.myMethod, 1.5 * 1000, "1"); // 1.5초 후 "undefined" 기록

setTimeout(function () {
  myArray.myMethod();
}, 2.0 * 1000); // 2초 후 "zero,one,two" 기록
setTimeout(function () {
  myArray.myMethod("1");
}, 2.5 * 1000); // 2.5초 후 "one" 기록
setTimeout.call(myArray, myArray.myMethod, 2.0 * 1000); // 오류
setTimeout.call(myArray, myArray.myMethod, 2.5 * 1000, 2); // 같은 오류

//해결법
//함수 감싸기
// 이 문제를 해결할 때 자주 사용하는 방법 중 하나는 this를 설정할 수 있도록 함수를 다른 함수로 감싸는 것입니다.

setTimeout(function () {
  myArray.myMethod();
}, 2.0 * 1000);

setTimeout(function () {
  myArray.myMethod();
}, 2.5 * 1000);

const obj = {
  value: 42,
  normalFunc: function () {
    console.log(this.value);
  },
  arrowFunc: () => {
    console.log(this.value);
  },
};

obj.normalFunc();
obj.arrowFunc();

setTimeout(function () {
  console.log("Hello World!");
}, 500);

setInterval();
