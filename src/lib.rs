use ed25519_dalek::{Keypair,Signature,Signer,Verifier,PublicKey};
use rand::{RngCore,rngs::OsRng};
use bincode::deserialize;

use wasm_bindgen::prelude::*;
use js_sys;


// To test queries via WASM
use hyper::{Client,body::HttpBody as _};

// To parse bodies
use tokio::io::{stdout, AsyncWriteExt as _};






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
pub async fn call_api() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {

    // This is where we will setup our HTTP client requests.
    // Still inside `async fn main`...
    let client = Client::new();

    // Parse an `http::Uri`...
    let uri = "http://httpbin.org/ip".parse()?;

    // Await the response...
    let mut resp = client.get(uri).await?;
    
    
    // And now...
    while let Some(chunk) = resp.body_mut().data().await {
        stdout().write_all(&chunk?).await?;
    }
  
    Ok(())

}
