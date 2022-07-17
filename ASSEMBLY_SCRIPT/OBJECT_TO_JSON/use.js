import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fs from 'fs'

const wasm = fs.readFileSync('test.wasm')

const meteredWasm = metering.meterWASM(wasm,{
    meterType: 'i32'
})

//------------------- Лимиты энергии -------------------

const energyLimit = 2000000
let energyUsed = 0


let wasmMetered = await loader.instantiate(meteredWasm,{
    
    metering: {
      
        usegas: (energy) => {
        
            energyUsed += energy

            if (energyUsed > energyLimit) throw new Error('No more energy!')

        }
    },

    jsonPack:{
        toJSON:JSON.stringify
    }

});


let Vector2D = wasmMetered.exports.Vector2D;

console.log(`Class fetch, energy used ${energyUsed * 1e-4}`);


let obj=new Vector2D(33,10)

console.log(`Object creation, energy used ${energyUsed * 1e-4}`);


let myObject = wasmMetered.exports.__getString(obj.getJSON())

console.log(myObject)


// console.log(`JSON'ed object, energy used ${energyUsed * 1e-4}`)



// let first_str_index = wasmMetered.exports.__newString("Hello");

// console.log(`String creation, energy used ${energyUsed * 1e-4}`);
