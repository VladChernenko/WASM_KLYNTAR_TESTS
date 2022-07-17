
@external("some_kly_env.js","anotherName")
declare function makeRecursive(n:i32):void;


export function AddInts(a: i32, b: i32 ): i32 {

    makeRecursive(a);

    return a + b;
   
}