var co = require('co');
var timer = function(i){
    return new Promise(function(res,rej){
        setTimeout(function(){
            res(i+1)
        },1000)
    })
}
var  a= function* () {
    var a = yield timer(1);
    var b = yield timer(a);
    console.log(a,b);
    return b;
}
co(a).then(function(b){
    console.log('end',b)
});
console.log(1);
timer(1);