"use strict";
/*
object-oriendted programming
class : template
object: instance of a class
javascript classed
-introduced in es6
-syntactical sugar over prototype-based inheritance 
Getter and setters

*/

class 고객 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  #privateField = 0;
  publicField = 1;
  get age() {
    return this._age;
  }
  set age(value) {
    if (value < 0) {
      throw Error("age can not be negative");
    }
    this._age = value;
  }

  소개() {
    return "나는 부모입니다.";
  }
}

class vip고객 extends 고객 {
  소개() {
    return `${super.소개()} 그리고 나는 자식입니다.`;
  }
}

const user1 = new 고객("상훈", -1);
console.log(user1);
