class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(name, callback) {}
}

let arr = [
  [1, 2],
  [3, 4],
];
console.log(arr);

let a = arr.entries();

console.log(Array.from(a));
