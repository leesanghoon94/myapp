function getThis() {
  return this;
}

const 객체1 = { 이름: "객체1" };
const 객체2 = { 이름: "객체2" };

객체1.getThis = getThis;
객체2.getThis = getThis;

console.log(객체1.getThis());
console.log(객체2.getThis());

const obj3 = {
  __proto__: 객체1,
  name: "obj3",
};

console.log(obj3.getThis());

const obj4 = {
  name: "obj4",
  getThis() {
    return this;
  },
};

const obj5 = { name: "obj5" };

obj5.getThis = obj4.getThis;
console.log(obj5.getThis());

function getThisStrict() {
  "use strict"; // Enter strict mode
  return this;
}

// Only for demonstration — you should not mutate built-in prototypes
Number.prototype.getThisStrict = getThisStrict;
console.log(typeof (1).getThisStrict()); // "number"

console.log(typeof getThisStrict()); // "undefined"

Number.prototype.getThis = getThis;
console.log(typeof (1).getThis());
console.log(getThis() === globalThis);

//콜백
function logThis() {
  "use strict";
  console.log(this);
}

[1, 2, 3].forEach(logThis);

[1, 2, 3].forEach(logThis, { name: "obj" });

//arrow functions
const globalObject = this;
const foo = () => this;
console.log(foo() === globalObject);

//바인딩을 수동으로 처리 일반 함수는 호출 방식에 따라 This가 바뀌므로, 특정 객체에 고정하려면 수동으로 바인딩해야함 bind,call,apply 메서드
const 객체 = { 이름: "객체" };
function bind() {
  console.log(this.이름);
}
const boundTest = bind.bind(객체);
boundTest();

const obj = { name: "obj" };

// Attempt to set this using call
console.log(foo.call(obj) === globalObject); // true

// Attempt to set this using bind
const boundFoo = foo.bind(obj);
console.log(boundFoo() === globalObject); // true

///constructor

function C() {
  this.a = 37;
}

let o = new C();
console.log(o.a);

function C2() {
  this.a = 37;
  return { a: 38 };
}

o = new C2();
console.log(o.a);

//class
class CC {
  instanceField = this;
  static staticField = this;
}

const c = new CC();
console.log(c.instanceField === c); // true
console.log(CC.staticField === CC); // true

const asdf = {
  getThisGetter() {
    const getter = () => this;
    return getter;
  },
};

const fn = asdf.getThisGetter();
console.log(fn() === asdf); // true
