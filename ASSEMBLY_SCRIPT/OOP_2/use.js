import loader from '@assemblyscript/loader'
import fs from 'fs';

(async () => {
    
    let wasm = fs.readFileSync('test.wasm');
 
    // создать экземпляр модуля с помощью загрузчика
    let myModule = await loader.instantiate(wasm);

    // JavaScript
    const { Foo, getFoo } = myModule.exports
    const { __getString, __pin, __unpin } = myModule.exports
    
    const fooPtr = __pin(getFoo()) // pin if necessary
    const foo = Foo.wrap(fooPtr)
    const strPtr = foo.getString()
    console.log(__getString(strPtr))
    __unpin(fooPtr) // unpin if necessary
    
})();

