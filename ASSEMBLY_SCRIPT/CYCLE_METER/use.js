import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'

const wasm = fs.readFileSync('test.wasm')

let module = await loader.instantiate(wasm);

const meteredWasm = metering.meterWASM(wasm,{
  meterType: 'i32'
})



const limit = 90000000
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



//console.log(module.exports.getX5(10))
//console.log(wasmMetered.exports.AddInts(10,30))


//------------------------ Тестировал чтоб оно в сумме считало

const result = wasmMetered.exports.getX5(10);
console.log(`result:${result}, gas used ${gasUsed * 1e-4}`) // result:720, gas used 0.4177

const result2 = wasmMetered.exports.getX5(10);
console.log(`result:${result2}, gas used ${gasUsed * 1e-4}`) // result:720, gas used 0.4177

const result3 = wasmMetered.exports.getX7(10);
console.log(`result:${result3}, gas used ${gasUsed * 1e-4}`)