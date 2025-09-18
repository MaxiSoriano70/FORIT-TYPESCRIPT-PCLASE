function doThing(o: any){
    let t = 0;
    for (let i = 0; i < o.it.length; i++){
        t += o.it[i].p * o.it[i].q;
    }
    if(o.d){
        t = t * 0.9;
    }
    console.log("sending mail to" + o.e);
    return t;
}

const ord = {
    it: [{ p: 100, q: 2},{ p: 50, q: 1}],
    d: true,
    e: "cliente@correo.com"
}

console.log(doThing(ord))