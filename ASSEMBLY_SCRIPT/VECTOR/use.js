import loader from '@assemblyscript/loader'
import fs from 'fs';

(async () => {
    
    let wasm = fs.readFileSync('test.wasm');
 
    // создать экземпляр модуля с помощью загрузчика
    let module = await loader.instantiate(wasm);

// module.exports.Vector2D отражает класс AssemblyScript.
let Vector2D = module.exports.Vector2D;
let vector1 = new Vector2D(3, 4);
let vector2 = new Vector2D(4, 5);
vector2.y += 10;
vector2.add(vector1);

console.log(`
 vector1=(${vector1.x}, ${vector1.y})
 vector2=(${vector2.x}, ${vector2.y})
 vector1.magnitude=${vector1.Magnitude()}
 vector2.magnitude=${vector2.Magnitude()}
 `)
 

 console.log('VEC 1 ',JSON.stringify(vector1))
 console.log('VEC 2 ',vector2)

})();
