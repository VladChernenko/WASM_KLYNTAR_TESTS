import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'


//Use release WASM version
const wasm = fs.readFileSync('../target/wasm32-unknown-unknown/release/test_with_rust.wasm')

console.log(wasm)


const meteredWasm = metering.meterWASM(wasm,{
    meterType: 'i32'
})

//------------------- Лимиты энергии -------------------

const energyLimit = 2000000
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

console.log(`Result:${result}, energy used ${energyUsed * 1e-4}`);

//Another test

let factorialResult = wasmMetered.exports.testFactorial(777);

console.log(`Factorial result:${factorialResult}, energy used ${energyUsed * 1e-4}`);