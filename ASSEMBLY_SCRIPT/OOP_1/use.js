import loader from '@assemblyscript/loader'
import fs from 'fs';

(async () => {
    
    let wasm = fs.readFileSync('test.wasm');
 
    // создать экземпляр модуля с помощью загрузчика
    let module = await loader.instantiate(wasm);

    console.log(module.exports.staticOne())
    
})();