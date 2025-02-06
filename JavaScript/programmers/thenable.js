class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(res,rej) {
        console.log(res);
        setTimeout(()=>res(this.num), 1000);
    }
}

new Promise(res => res(10))
.then( result => {
    return new Thenable(result)
})
.then( result => {console.log(result)});