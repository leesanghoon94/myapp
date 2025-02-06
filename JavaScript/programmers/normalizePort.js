function normalizePort(val){
    let port = parseInt(val, 10);
    if(isNaN(port)){
        return val
    }

    if(port >=0){
        return port
    }
    return false
}

normalizePort(process.env.PORT || '3000');

console.log(normalizePort(process.env.PORT || '3000'))