// Copied to a JS object
class PlainObject {
    field: i32;
    ky: i32;
}
  
export function getObject(val:i32): PlainObject {
    
    return {
      field: val,
      ky:777
    };
}


export function add(a: i32, b: i32): i32 {
  return a + b
}


//Global VARS
export const foo = 1
export var elite = 1337


export function getElite():i32 {
  return elite
}