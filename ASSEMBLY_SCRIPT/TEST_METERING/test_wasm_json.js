import fs from 'fs';

import {wasm2json,json2wasm} from 'wasm-json-toolkit'

const wasm = fs.readFileSync('add.wasm')
const json = wasm2json(wasm)

console.log(JSON.stringify(json, null, 2))

console.log('Default WASM => ',wasm)
console.log('JSON 2 WASM => ',json2wasm(json))


// fs.writeFileSync('json2wasm.wasm',wasm2json())