let my_string = "rermgorpsam";
let queries = [
  [2, 3],
  [0, 7],
  [5, 9],
  [6, 10],
];

function solution(str, queries) {
  for (let i = 0; i < queries.length; i++) {
    let 앞 = queries[i][0];
    let 뒤 = queries[i][1] + 1;

    // 앞부분 + 뒤집은 부분 + 뒷부분
    str =
      str.substring(0, 앞) +
      str.slice(앞, 뒤).split("").reverse().join("") +
      str.substring(뒤);
  }
  console.log(str);

  return str;
}

solution(my_string, queries);

let arr = [1, 1, 1, 1];
let asdf = arr.every((val) => val === 1);
