/**Function.prototype.bind()
bind() 메소드가 호출되면 새로운 함수를 생성합니다. 
받게되는 첫 인자의 value로는 This 키워드를 설정하고,
이어지는 인자들은 바인드된 함수의 인수에 제공됩니다 
*/

const myModule = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = myModule.getX;
console.log(unboundGetX()); // undefined

const boundGetX = unboundGetX.bind(myModule);
console.log(boundGetX()); // 42

//바인딩된 함수 생성
this.x = 9;
let bindModule = {
  x: 81,
  getX: function () {
    return this.x;
  },
};

bindModule.getX();

let retrieveX = bindModule.getX;
retrieveX();

let boundGetX2 = retrieveX.bind(bindModule);
boundGetX2();

// 부분 적용 함수
function list() {
  return Array.prototype.slice.call(arguments);
}

let list1 = list(1, 2, 3);

let leadingThirtysevenList = list.bind(null, 37);

let list2 = leadingThirtysevenList();
let list3 = leadingThirtysevenList(1, 2, 3);

function addArguments(arg1, arg2) {
  return arg1 + arg2;
}
let result = addArguments(1, 2);

let addThirtySeven = addArguments.bind(null, 37);
let result2 = addThirtySeven(5);
let result3 = addThirtySeven(5, 10);
