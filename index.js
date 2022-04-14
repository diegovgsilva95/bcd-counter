"use strict";

let c = 0;
const l2s = function(s){
    return JSON.stringify("abcdefg".split("").map(v=>s.includes(v)?1:0));
};
const strmap = function(str, map){
    // str = "abcdefg";
    // map = "abcdefg";
    let o = "";
    for(let x of map){
        let ix = x.toLocaleLowerCase().charCodeAt(0) - 97;
        if(ix < str.length)
            o += str[ix];
    }
    return o;
    
}
const states = [
   //a,b,c,d,e,f,g
    [1,1,1,1,1,1,0],     // 0
    [0,1,1,0,0,0,0],     // 1
    [1,1,0,1,1,0,1],     // 2
    [1,1,1,1,0,0,1],     // 3
    [0,1,1,0,0,1,1],     // 4
    [1,0,1,1,0,1,1],     // 5
    [1,0,1,1,1,1,1],     // 6
    [1,1,1,0,0,0,0],     // 7
    [1,1,1,1,1,1,1],     // 8
    [1,1,1,1,0,1,1],     // 9
    [1,1,1,0,1,1,1],     // a
    [0,0,1,1,1,1,1],     // b
    [0,0,0,1,1,0,1],     // c
    [0,1,1,1,1,0,1],     // d
    [1,0,0,1,1,1,1],     // e
    [1,0,0,0,1,1,1],     // f
];

const setSegment = function(box, seg, v){
    box.querySelector(".segment-" + seg).classList.toggle("on", v);
};

const setBCD = function(box, n){
    let state = states[n];
    setSegment(box, "a", state[0]);
    setSegment(box, "b", state[1]);
    setSegment(box, "c", state[2]);
    setSegment(box, "d", state[3]);
    setSegment(box, "e", state[4]);
    setSegment(box, "f", state[5]);
    setSegment(box, "g", state[6]);
};

let r = [];
for(let [i, state] of Object.entries(states)){
    let ri = strmap(state.join(""),"afbgecd");
    console.log(i, ri);
    r.push(ri);
};
console.log(JSON.stringify(r));


;(function(b){
    let c = 0;
    let s = parseInt("0123456", b);
    let e = parseInt("6543210", b);
    for(let i = s; i < e; i++){
        let ig = i.toString(b).padStart(7,"0");
        let ix = new Set([...ig]);
        if(ix.size == 7)
            c++;
            // console.log(ig);
    }
    console.log(c);
})(7);








setInterval(function(){
    setBCD(document.querySelector(".segments-un"), Math.trunc(c / (10 ** 0)) % 10); //f
    setBCD(document.querySelector(".segments-dec"), Math.trunc(c / (10 ** 1)) % 10); //f
    setBCD(document.querySelector(".segments-cent"), Math.trunc(c / (10 ** 2)) % 10); //f
    c = (c + 1) % 1000;
},1000/2);
