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


//------------------------ Запишем wasm версию с инжектированной функцией

fs.writeFileSync('metered.wasm',meteredWasm)



// const result = wasmMetered.exports.testFromOuter(10);

// console.log(`Result:${result}, gas used ${energyUsed * 1e-4}`)