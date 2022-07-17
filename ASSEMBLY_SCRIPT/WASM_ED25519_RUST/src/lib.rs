use ed25519_dalek::{Keypair,Signature,Signer,Verifier,PublicKey};


//----------------------------- PUBLIC AREA -----------------------------


#[no_mangle]
pub extern "C" fn sign(rawKeyPair:[u8;64],data:&[u8]) -> [u8;64] {

    let keypair=Keypair::from_bytes(&rawKeyPair).unwrap();//derive keypair

    let signa=&keypair.sign(data).to_bytes();//get raw signature

    *signa

}


#[no_mangle]
pub extern "C" fn verify(rawPubkey:&[u8],data:&[u8],signa:&[u8]) -> bool {

    let pubKey=PublicKey::from_bytes(rawPubkey).unwrap();

    let signature=Signature::from_bytes(signa).unwrap();  

    pubKey.verify(data,&signature).is_ok()

}



#[no_mangle]
pub extern "C" fn AddInts(a:i32,b:i32) -> i32 {

    a+b

}