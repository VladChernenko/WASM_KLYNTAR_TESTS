use std::fs::File;
use std::io::prelude::*;


fn custom_wasm() -> std::io::Result<()>{
    
    let mut file = File::open("foo.txt")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    
    println!("
*************************************
    \n\nFrom file ===> {}\n\n
*************************************
    
    ",contents);
    
    Ok(())

}




fn main() {

    println!("Start");
    custom_wasm();

}