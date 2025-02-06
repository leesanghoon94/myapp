/*
문자열 my_string과 정수 배열 indices가 주어질 때,
 my_string에서 indices의 원소에 해당하는 인덱스의 글자를 지우고 이어 붙인 문자열을 return 하는 solution 함수를 작성해 주세요. 
*/

let str = "apporoograpemmemprs";
let indices = [1, 16, 6, 15, 0, 10, 11, 3];

function solution(str, indices) {
  return [...str].filter((v, i) => !indices.includes(i)).join("");
}

console.log(solution(str, indices)); // "programmers"

let a = indices.includes(1);
console.log(a);
