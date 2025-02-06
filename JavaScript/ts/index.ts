type 내타입 = string | number;

type Member = {
  name: string;
};

let 이름: string[] = ["lee", "이"];
let 이름2: { name?: string } = {};
let 이름3: string | number = 123;
let 이름4: 내타입 = 123;

function 함수(x: number): number {
  return x * 2;
}

함수(2);

let kaney: Member = { name: "west" };

class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
