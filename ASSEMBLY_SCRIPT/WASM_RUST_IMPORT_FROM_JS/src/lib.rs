//----------------------------- IMPORT AREA -----------------------------


extern "C" {
    fn makeTripple(var:i32) -> i32;
}



//----------------------------- LOCAL POOL -----------------------------


//Let it be private function
fn factorial(num: i32) -> i32 {
    match num {
        0 => 1,
        1 => 1,
        _ => factorial(num - 1) * num,
    }
}



//----------------------------- PUBLIC AREA -----------------------------

#[no_mangle]
pub extern "C" fn testFactorial(num: i32) -> i32 {

    factorial(num)

}


#[no_mangle]
pub extern "C" fn AddIntsAndTipple(a:i32,b:i32) -> i32 {

    unsafe{

        makeTripple(a)+a+b

    }

}