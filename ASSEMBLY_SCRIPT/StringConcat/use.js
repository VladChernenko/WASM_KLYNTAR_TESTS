import loader from '@assemblyscript/loader'
import fs from 'fs';

(async () => {
    
    let module = await loader.instantiate(fs.readFileSync('./concat.wasm'));
    // необходимо использовать __newString, __getString
    // компиляция с флагом --exportRuntime
    let first_str_index = module.exports.__newString("DA");
    let second_str_index = module.exports.__newString("Sorry:)");
    let cat_str_index = module.exports.cat(first_str_index,second_str_index);

    console.log('DEFAULT ',cat_str_index);
    
    let cat_string = module.exports.__getString(cat_str_index);
   
   console.log(cat_string);
   
})();