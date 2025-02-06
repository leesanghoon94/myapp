var num_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const slices = {
  1: (num_list, [a, b, c]) => num_list.slice(0, b + 1),
  2: (num_list, [a, b, c]) => num_list.slice(a),
  3: (num_list, [a, b, c]) => num_list.slice(a, b + 1),
  4: (num_list, [a, b, c]) =>
    num_list.slice(a, b + 1).filter((_, i) => i % c === 0),
};

function solution(n, slicer, num_list) {
  return slices[n](num_list, slicer);
}
var n = 3;
var slicer = [1, 5, 2];

solution(n, slicer, num_list);

console.log(slices[1]);
