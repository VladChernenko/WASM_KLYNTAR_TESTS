//----------------------------- IMPORT AREA -----------------------------


extern "C" {

    fn makeHTTPRequest();

}


//----------------------------- PUBLIC AREA -----------------------------


#[no_mangle]
pub extern "C" fn justATest(a:i32,b:i32) -> i32 {

    unsafe{

        makeHTTPRequest();

    }

    a+b

}