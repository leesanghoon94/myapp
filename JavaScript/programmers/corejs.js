new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("ok");
    },1000)
})
.then(function(result){
    console.log(result);
    return result+"ok";
})
.then(function(result){
    console.log(result);
    return result+"ok";
}).then(result=>{
    console.log(result);
    return result+"ok";
})


let promise = new Promise(function(resolve,reject){
    setTimeout(function(){resolve(1);},1000)
})

promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
});

promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
});

promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
});