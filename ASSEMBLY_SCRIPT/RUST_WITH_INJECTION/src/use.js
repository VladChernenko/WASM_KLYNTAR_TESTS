// let mod=require('/root/WASM_RUST_ED25519/pkg/WASM_RUST_ED25519.js')
// let Base58 = require('base-58')

// let keys=mod.genKeys()
// let PUB=keys.slice(32,64)
// let PRV=keys.slice(0,32)

// console.log(keys)

// console.log(`Your PUB => ${Base58.encode(keys.slice(32,64))}`)
// console.log(`Your PRIVATE => ${Base58.encode(keys.slice(0,32))}`)

// let signa=mod.sign(keys,[10,46,6])

// console.log(signa)

// console.log(mod.verify(keys.slice(32,64),[10,46,6],signa))

// console.time('A')
// for(let i=0;i<10000;i++) mod.verify(PUB,[10,46,6],signa)
// console.timeEnd('A')


import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'

const wasm = fs.readFileSync('../pkg/WASM_RUST_ED25519_bg.wasm')

console.log(wasm)

// const limit = 0.05//90000000
// let gasUsed = 0


// let wasmMetered = await loader.instantiate(meteredWasm,{
//     'metering': {
//       'usegas': (gas) => {
//         gasUsed += gas
//         if (gasUsed > limit) {
//           throw new Error('out of gas!')
//         }
//       }
//     }
//   });

// console.log('Default WASM => ',wasm)
// console.log('Metered WASM => ',meteredWasm)
// console.log(module.exports.AddInts(10,30))
// console.log(wasmMetered.exports.AddInts(10,30))

// const result = wasmMetered.exports.AddInts(1000,30)
// console.log(`result:${result}, energy used ${gasUsed * 1e-4}`) // result:720, energy used 0.4177


