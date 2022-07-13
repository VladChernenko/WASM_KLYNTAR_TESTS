import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'

const wasm = fs.readFileSync('test.wasm')


const costTable = JSON.parse(fs.readFileSync('costTable.json'))

const meteredWasm = metering.meterWASM(wasm,{
  meterType: 'i32',
  costTable
})

const limit = 2000000
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


//------------------------ Тест обновлённой таблицы по оплате


const result = wasmMetered.exports.AddInts(10,33);
console.log(`Result:${result}, gas used ${gasUsed * 1e-4}`) // result:720, gas used 0.4177





//console.log(module.exports.getX5(10))
//console.log(wasmMetered.exports.AddInts(10,30))

//------------------------ Тестировал чтоб оно в сумме считало

// const result = wasmMetered.exports.getX5(10);
// console.log(`result:${result}, gas used ${gasUsed * 1e-4}`) // result:720, gas used 0.4177

//-------------------------- Тестирую энергию и строки ------------------------

// необходимо использовать __newString, __getString
// компиляция с флагом --exportRuntime
// let first_str_index = wasmMetered.exports.__newString("DA");
// let second_str_index = wasmMetered.exports.__newString("PIZDA");
// let cat_str_index = wasmMetered.exports.cat(first_str_index,second_str_index);

// console.log('DEFAULT ',cat_str_index);
    
// let cat_string = wasmMetered.exports.__getString(cat_str_index);
   
// console.log('String is =>',cat_string)

// console.log(`Gas => ${gasUsed * 1e-4} / ${limit * 1e-4}`)


//-------------------------- Энергия и создание объектов ------------------------

