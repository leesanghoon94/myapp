function solution(a, b, c, d) {
  var answer = 0;
  const set = new Set([a, b, c, d]);
  const counts = {};

  // 각 주사위 값의 빈도를 counts 객체에 저장
  [a, b, c, d].forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });

  if (set.size === 1) {
    // 모든 주사위 값이 같을 때
    const setValue = set.values().next().value;
    answer += 1111 * setValue;
  } else if (set.size === 2) {
    const [p, q] = Object.keys(counts).map(Number);
    const [cp, cq] = [counts[p], counts[q]];
    if (cp === 3 || cq === 3) {
      // 세 개가 같고 나머지 하나가 다른 경우
      const 세개 = cp === 3 ? p : q;
      const 하나 = cp === 1 ? p : q;
      answer += (10 * 세개 + 하나) ** 2;
    } else {
      // 두 개씩 같은 경우
      answer += (p + q) * Math.abs(p - q);
    }
  } else if (set.size === 3) {
    const p = Object.entries(counts).reduce((acc, [key, value]) => {
      if (value !== 2) {
        acc[key] = value;
      }
      return acc;
    }, {});
    const [a, c] = Object.keys(p).map(Number);
    return (answer += a * c);
  } else if (set.size === 4) {
    answer += Math.min(...set);
  }
  return answer;
}

console.log(solution(2, 2, 2, 2)); // Expected output: 2222
console.log(solution(4, 1, 4, 4)); // Expected output: 1681
console.log(solution(6, 3, 3, 6)); // Expected output: 27
console.log(solution(2, 5, 2, 6)); // Expected output: 30
console.log(solution(6, 4, 2, 5)); // Expected output: 2

let map = new Map();
map.set("sex", "fuck");
map.set("나이", 69);
console.log(map);
programmers;
