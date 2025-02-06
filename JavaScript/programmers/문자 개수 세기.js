function solution(my_string) {
  const answer = new Array(52).fill(0);
  for (const char of my_string) {
    if (char >= "A" && char <= "Z") {
      const index = char.charCodeAt(0) - "A".charCodeAt(0);
      answer[index] += 1;
    } else if (char >= "a" && char <= "z") {
      const index = 26 + (char.charCodeAt(0) - "a".charCodeAt(0));
      answer[index] += 1;
    }
  }

  return answer;
}

console.log(solution("Programmers"));

let a = [];
a.length = 52;
a.fill(0);
console.log(a);

console.log(a.indexOf(0));

let str = "kaneywestbound";
str.split("").map((n) => {
  console.log(n);
});

const result = [...str].reduce((pre, cur) => {
  return pre + cur;
}, "");

console.log(result); // "kaneywestbound"
