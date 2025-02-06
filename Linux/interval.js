let index =0
const words = ["H","E","L","L","O","W","O","R","L","D"]
setInterval(()=>{
	console.log(words[(index++)%words.length])
}, 1000)
