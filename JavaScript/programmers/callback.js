/**
 * 함수에 파라미터로 들어가는 함수
 * 순차적으로 실행하고 싶을 때 씀
 */
function fn(){
    setTimeout(() => {
        console.log("callback called");
    },1000)
}

fn()

let date = new Date();

let a = `${ date.getFullYear() }년 ${ date.getMonth() + 1 }월 ${ date.getDate() }일`

console.log(a);

let newDate = new Intl.DateTimeFormat('Ko-KR', {dateStyle : 'full', timeStyle: "full"}).format(date);
console.log(newDate)

let 몇일전 = new Intl.RelativeTimeFormat().format(-10, 'quarter')
console.log(몇일전)


/*
어휘적 환경 (lexical environment)
 */

let one;
one = 1

function addOne(num) {
    console.log(num)
    console.log(one)
    console.log(one +num)
}

addOne(5)

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const main = async () => {
    console.log('waiting for 1 second...')
    await delay(1000)
    console.log('1 second has passed!')
}

main()

// promise.all은 하나가 실패하면 값이 안나올때 promise.allsettled
Promise.all([delay(100),delay(200),delay(300)])
const testAwait = async () => {
    console.log(await '123')
    console.log(await Promise.resolve('123'))
}

testAwait()

// Promise.race([fetch('https://www.naver.com').new Promise((res,rej) =>{
//     setTimeout(()=>rej(new Error("시간초과")))
// }1000))])


let promise = new Promise ( function(resolve,reject) {
	setTimeout(()=> resolve("완료"), 1000)
})


console.log("--------promise 생성됨",promise)

promise.then( result => {
    console.log(promise)
    console.log("프로미스 결과:",result)
})

let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("완료"), 1000);
});

promise2.then((result) => {
    console.log("Promise가 성공 상태로 변환됨:", result);
}).catch((error) => {
    console.log("Promise가 실패 상태로 변환됨:", error);
});

console.log("Promise 객체 확인:", promise2);

console.log("-----------------------")

function checkPromiseState(promise) {
    // Promise 상태 확인 함수
    return Promise.race([
        promise.then(
            (value) => ({ state: "fulfilled", value }),
            (reason) => ({ state: "rejected", reason })
        ),
        new Promise((resolve) => setTimeout(() => resolve({ state: "pending" }), 0))
    ]);
}

let promise3 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("완료"), 1000);
});

// Promise 상태 확인
checkPromiseState(promise3).then((state) => console.log("Promise 상태:", state));

setTimeout(() => {
    checkPromiseState(promise3).then((state) => console.log("1초 후 상태:", state));
}, 1500);
