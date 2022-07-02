let mod=require('../pkg/WASM_RUST_ED25519.js')
let Base58 = require('base-58')

let keys=mod.genKeys()
let PUB=keys.slice(32,64)
let PRV=keys.slice(0,32)

console.log(keys)

console.log(`Your PUB => ${Base58.encode(keys.slice(32,64))}`)
console.log(`Your PRIVATE => ${Base58.encode(keys.slice(0,32))}`)

let signa=mod.sign(keys,[10,46,6])

console.log(signa)

console.log(mod.verify(keys.slice(32,64),[10,46,6],signa))

console.time('A')
for(let i=0;i<10000;i++) mod.verify(PUB,[10,46,6],signa)
console.timeEnd('A')