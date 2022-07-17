// import loader from '@assemblyscript/loader'
// import fs from 'fs';

// (async () => {
    
//     let wasm = fs.readFileSync('add.wasm');
 
//     // создать экземпляр модуля с помощью загрузчика
//     let module = await loader.instantiate(wasm);

//     console.log(module.exports.AddInts(10,30))
    
// })();

// ------------------------------------------------------------------------



import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'

const wasm = fs.readFileSync('add.wasm')

let module = await loader.instantiate(wasm);

const meteredWasm = metering.meterWASM(wasm,{
  meterType: 'i32'
})

const limit = 0.05//90000000
let gasUsed = 0


let wasmMetered = await loader.instantiate(meteredWasm,{
    'metering': {
      'usegas': (gas) => {
        gasUsed += gas
        if (gasUsed > limit) {
          throw new Error('out of gas!')
        }
      }
    }
  });

console.log('Default WASM => ',wasm)
console.log('Metered WASM => ',meteredWasm)
console.log(module.exports.AddInts(10,30))
console.log(wasmMetered.exports.AddInts(10,30))

const result = wasmMetered.exports.AddInts(1000,30)
console.log(`result:${result}, energy used ${gasUsed * 1e-4}`) // result:720, energy used 0.4177





//console.log(meteredWasm)

// const mod = new WebAssembly.Module(meteredWasm.module)
// const instance = WebAssembly.Instance(mod, {
//   'metering': {
//     'usegas': (gas) => {
//       gasUsed += gas
//       if (gasUsed > limit) {
//         throw new Error('out of gas!')
//       }
//     }
//   }
// })

// const result = instance.exports.fac(6)
// console.log(`result:${result}, energy used ${gasUsed * 1e-4}`) // result:720, energy used 0.4177