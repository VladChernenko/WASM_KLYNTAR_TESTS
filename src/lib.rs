use ed25519_dalek::{Keypair,Signature,Signer,Verifier,PublicKey};
use rand::{RngCore,rngs::OsRng};

use wasm_bindgen::prelude::*;
use js_sys;


// To test access to FS via WASM
use std::fs::File;
use std::io::prelude::*;



#[wasm_bindgen]
pub fn genKeys() -> js_sys::Uint8Array {

    let mut csprng = OsRng{};
    
    let keypair = Keypair::generate(&mut csprng);

    //js_sys::Uint8Array::from(&[keypair.secret.to_bytes(),keypair.public.to_bytes()].concat()[..])

    js_sys::Uint8Array::from(&keypair.to_bytes()[..])

}



#[wasm_bindgen]
pub fn sign(rawKeyPair:&[u8],data:&[u8]) -> js_sys::Uint8Array {

    let keypair=Keypair::from_bytes(rawKeyPair).unwrap();//derive keypair

    let signa=&keypair.sign(data).to_bytes();//get raw signature

    js_sys::Uint8Array::from(&signa[..])

}


#[wasm_bindgen]
pub fn verify(rawPubkey:&[u8],data:&[u8],signa:&[u8]) -> bool {

    let pubKey=PublicKey::from_bytes(rawPubkey).unwrap();

    let signature=Signature::from_bytes(signa).unwrap();  

    pubKey.verify(data,&signature).is_ok()

}


#[wasm_bindgen]
pub fn simple_print(){

    println!("Simple println");

}


#[wasm_bindgen]
pub fn custom_wasm()->js_sys::Uint8Array{

    println!("Going to read the file");

    match File::open("foo.txt") {
      
        // The file is open (no error).
        Ok(mut file) => {
    
            let mut content = String::new();

            // Read all the file content into a variable (ignoring the result of the operation).
            file.read_to_string(&mut content).unwrap();

            println!("
            *************************************
                \n\nFrom file ===> {}\n\n
            *************************************
                
            ",content);

            let val=&content.as_bytes()[..];

            return js_sys::Uint8Array::from(val);

            // The file is automatically closed when is goes out of scope.
        },
        // Error handling.
        Err(error) => {
            println!("Error opening file {}: {}", "foo.txt", error);

            let val=&"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".as_bytes()[..];
        
            return js_sys::Uint8Array::from(val);

        },
    }

}



