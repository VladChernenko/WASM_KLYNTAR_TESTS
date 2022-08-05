import loader from '@assemblyscript/loader'
import metering from 'wasm-metering'
import fetch from 'node-fetch'
import fs from 'fs'


//Use release WASM version
const wasm = fs.readFileSync('../target/wasm32-unknown-unknown/release/PAY_FOR_IMPORTED_TO_WASM.wasm')

console.log(wasm)


const meteredWasm = metering.meterWASM(wasm,{
    meterType: 'i32'
})



console.log('After injection => ',meteredWasm)


fs.writeFileSync('injected.wasm',meteredWasm)

//------------------- Лимиты энергии -------------------

const energyLimit = 2000000
let energyUsed = 0


let wasmMetered = await loader.instantiate(meteredWasm,{
    
    metering: {
      
        usegas: energy => {

            energyUsed += energy
            
            if (energyUsed > energyLimit) throw new Error('No more energy!')
        }
        
    },
    
    env:{
        
        makeHTTPRequest:()=>{
            
            fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(console.log)
        
        }
    
    }

});


const result = wasmMetered.exports.justATest(100,20);

console.log(`Result:${result}, energy used ${energyUsed * 1e-4}`);