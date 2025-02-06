const a = new Set([1, 1, 1]);
const b = new Map([
  [1, "one"],
  [2, "two"],
  [4, "four"],
]);

console.log(a);

const set = new Set();
console.log(set);
//Set(0) {}
set.add(1).add("A").add(true);
console.log(set);
//Set(3) { 1, 'A', true }
set.delete(1); // true
set.delete(2); // false
/*
값의 개수 확인
세트의 size 속성을 통해서 해당 세트의 길이, 즉 얼마나 많은 값이 저장되어 있는지를 알아낼 수 있습니다.
*/
console.log(set.size);

/*
배열을 세트로 변환
실제로 코딩을 하다보면 기존에 존재하는 배열로 부터 새로운 세트를 만들어야 하는 경우가 빈번한데요. 이 때는 Set() 생성자의 인자로 해당 배열이 할당된 변수를 넘기면 됩니다.

여기서 중요한 부분은 이렇게 배열로 부터 세트를 만들어내면 중복 값이 모두 제거된다는 것입니다. 중복 값을 유지해야하는 상황에서는 절대로 배열을 세트로 변환하면 안되겠죠?
*/
const array = [1, 2, 2, 3, 3, 3];
const set22 = new Set(array); // Set(3) {1, 2, 3}

console.log(set22);

/*
Set을 배열로 변환
1. spread 연산자 사용 [...]
2. Array.from() 함수 객체 사용
*/
const spread = [...set22];
console.log(spread);
const from = Array.from(set22);
console.log("Array.from()", from);

/*
배열에서 중복 값 제거
세트는 중복 값을 허용하지 않기 때문에, 배열이나 문자열에서 중복된 값을 제거하는 데에 매우 유용하게 활용될 수 있습니다.
*/
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];

console.log("배열에서 중복 값 제거", uniqueNumbers);

/*
집합 연산
여러개의 세트를 상대로 다음과 가티 합집합, 교집합, 차집합을 구할 수 있습니다.
*/
const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([4, 5, 6, 7, 8]);

// 합집합
const union = new Set([...set1, ...set2]);
console.log("합집합", [...union]); // [1, 2, 3, 4, 5, 6, 7, 8]

// 교집합
const intersection = new Set([...set1].filter((value) => set2.has(value)));
console.log("교집합", [...intersection]); // [4, 5]

// 차집합
const difference = new Set([...set1].filter((value) => !set2.has(value)));
console.log("차집합", [...difference]); // [1, 2, 3]

// set value
const setValue = new Set([2, 2, 2, 2]);
console.log("set size", setValue.values().next());

/*
세트 순회
세트에 저장되어 있는 모든 값을 순회하고 싶을 때는 for 루프문안에서 of 연산자를 사용하면 됩니다.
*/
const 세트순회 = new Set([2, 1, 2, 2]);
for (const val of 세트순회) {
  console.log("세트순회", val);
}

세트순회.forEach((val) => console.log(val));
