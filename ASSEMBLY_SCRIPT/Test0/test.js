const fs = require('fs');
const bytes = fs.readFileSync('./test.wasm');

let global_test = null;

let importObject = {
    js: {
        pass_log: value => { console.log ("Lesson5: ", value) }
    }
};


(async()=>{

    const obj = await WebAssembly.instantiate(new Uint8Array(bytes));

    console.log(obj.instance.exports.fib(7));

})()