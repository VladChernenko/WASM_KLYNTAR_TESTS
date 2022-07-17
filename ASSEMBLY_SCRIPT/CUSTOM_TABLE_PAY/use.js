import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'

const wasm = fs.readFileSync('test.wasm')


const costTable = JSON.parse(fs.readFileSync('costTable.json'))


//------------------- ТЕСТИРУЕМ ЭКЗЕМПЛЯР С КАСТОМНОЙ ТАБЛИЦОЙ И БЕЗ -------------------

const meteredWasm = metering.meterWASM(wasm,{
    meterType: 'i32'
})

const meteredWasmCustomTable = metering.meterWASM(wasm,{
  meterType: 'i32',
  costTable
})

//------------------- Лимиты энергии -------------------

const limitForCustom = 2000000
let energyForCustom = 0

let wasmMeteredCustomTable = await loader.instantiate(meteredWasmCustomTable,{
    'metering': {
      'usegas': (energy) => {
        energyForCustom += energy
        if (energyForCustom > limitForCustom) {
          throw new Error('No more energy!')
        }
      }
    }
});



const limitForDef = 2000000
let energyForDef = 0

let wasmMeteredDef = await loader.instantiate(meteredWasm,{
    'metering': {
      'usegas': (energy) => {
        energyForDef += energy
        if (energyForDef > limitForDef) {
          throw new Error('No more energy!')
        }
      }
    }
});



//------------------------ Тест обновлённой таблицы по оплате

// * на примере SubInts - должно быть одинаково

const result = wasmMeteredCustomTable.exports.SubInts(10,33);
console.log(`CUSTOM Result:${result}, gas used ${energyForCustom * 1e-4}`) // result:720, gas used 0.4177

const result_def = wasmMeteredDef.exports.SubInts(10,33);
console.log(`DEF Result:${result_def}, gas used ${energyForDef * 1e-4}`) // result:720, gas used 0.4177


// * на примере AddInts

const resultPP = wasmMeteredCustomTable.exports.AddInts(10,33);
console.log(`CUSTOM Result:${resultPP}, gas used ${energyForCustom * 1e-4}`) // result:720, gas used 0.4177

const result_de = wasmMeteredDef.exports.AddInts(10,33);
console.log(`DEF Result:${result_de}, gas used ${energyForDef * 1e-4}`) // result:720, gas used 0.4177


//console.log(module.exports.getX5(10))
//console.log(wasmMetered.exports.AddInts(10,30))

//------------------------ Тестировал чтоб оно в сумме считало

// const result = wasmMetered.exports.getX5(10);
// console.log(`result:${result}, gas used ${gasUsed * 1e-4}`) // result:720, gas used 0.4177

//-------------------------- Тестирую энергию и строки ------------------------

// необходимо использовать __newString, __getString
// компиляция с флагом --exportRuntime
// let first_str_index = wasmMetered.exports.__newString("DA");
// let second_str_index = wasmMetered.exports.__newString("Sorry:)");
// let cat_str_index = wasmMetered.exports.cat(first_str_index,second_str_index);

// console.log('DEFAULT ',cat_str_index);
    
// let cat_string = wasmMetered.exports.__getString(cat_str_index);
   
// console.log('String is =>',cat_string)

// console.log(`Gas => ${gasUsed * 1e-4} / ${limit * 1e-4}`)


//-------------------------- Энергия и создание объектов ------------------------

