import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'


//Use release WASM version
const wasm = fs.readFileSync('../target/wasm32-unknown-unknown/release/klyntar_test_ed25519_rust_wasm.wasm')

console.log(wasm)


const meteredWasm = metering.meterWASM(wasm,{
    meterType: 'i32'
})

//------------------- Лимиты энергии -------------------

const energyLimit = 200000000000
let energyUsed = 0


let wasmMetered = await loader.instantiate(meteredWasm,{
    'metering': {
      'usegas': (energy) => {
        energyUsed += energy
        if (energyUsed > energyLimit) {
          throw new Error('No more energy!')
        }
      }
    }

});


const result = wasmMetered.exports.AddInts(100,20);

console.log(`Result:${result}, gas used ${energyUsed * 1e-4}`);

//---------------------------- ED25519 TEST ----------------------------

let publicKey=[
    198, 178,  43, 180, 120,   8,  37, 141,
    76, 237,   8,  66, 164, 201, 153, 112,
    169,  77, 195,  16,  92,  62,  83,  40,
    124,  42,  85, 124, 216, 188,  65, 252
  ],
  
  secretKey=new Uint8Array([
    127,  83, 127, 189, 199,  48,  72,  59,  81,  65, 217,
    194, 224, 237, 162, 140,  66, 253, 115, 251, 121, 200,
    31, 102,  48, 245,  28,  98, 154, 208, 190, 165, 198,
    178,  43, 180, 120,   8,  37, 141,  76, 237,   8,  66,
    164, 201, 153, 112, 169,  77, 195,  16,  92,  62,  83,
    40, 124,  42,  85, 124, 216, 188,  65, 252
  ])

console.log(secretKey)

let signa = wasmMetered.exports.sign(secretKey,new Uint8Array([10,20,30]))

console.log(signa)

// console.log(`Factorial result:${factorialResult}, gas used ${energyUsed * 1e-4}`);