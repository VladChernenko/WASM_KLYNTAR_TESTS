import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'

const wasm = fs.readFileSync('test.wasm')

//------------------- ТЕСТИРУЕМ ЭКЗЕМПЛЯР С КАСТОМНОЙ ТАБЛИЦОЙ И БЕЗ -------------------

const meteredWasm = metering.meterWASM(wasm,{
    meterType: 'i32'
})

//------------------- Лимиты энергии -------------------

const energyLimit = 2000000
let energyUsed = 0


//RecursiveFunction
let countDown=fromNumber=>{

    console.log(fromNumber);

    let nextNumber = fromNumber - 1;

    if (nextNumber > 0) countDown(nextNumber);

}

let wasmMetered = await loader.instantiate(meteredWasm,{
    'metering': {
      'usegas': (energy) => {
        energyUsed += energy
        if (energyUsed > energyLimit) {
          throw new Error('No more energy!')
        }
      }
    },

    //use our customFunctions
    'some_kly_env.js':{
        
        anotherName:countDown

    }
});

fs.writeFileSync('metered.wasm',meteredWasm)

const result = wasmMetered.exports.AddInts(100,20);

console.log(`Result:${result}, energy used ${energyUsed * 1e-4}`);