import loader from '@assemblyscript/loader'
import fs from 'fs';

(async () => {
    
    let wasm = fs.readFileSync('test.wasm');
 // создать экземпляр модуля с помощью загрузчика
    let module = await loader.instantiate(wasm);

    console.log(module.exports.add(10,15))
    console.log(module.exports.getObject(999))
    console.log('Elite is ',module.exports.getElite())

})();