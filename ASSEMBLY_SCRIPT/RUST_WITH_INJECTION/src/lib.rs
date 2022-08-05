use ed25519_dalek::{Keypair,Signature,Signer,Verifier,PublicKey};
use rand::{RngCore,rngs::OsRng};
use bincode::deserialize;

use wasm_bindgen::prelude::*;

use js_sys;

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