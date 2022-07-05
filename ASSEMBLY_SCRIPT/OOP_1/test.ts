class Animal<T> {
    static ONE: i32 = 1;
    static add(a: i32, b: i32): i32 { return a + b + Animal.ONE; }
  
    two: i16 = 2; // 6
    instanceSub<T>(a: T, b: T): T { return a - b + <T>Animal.ONE; } // tsc does not allow this
  }
  


//---------------------------------- EXPORT ----------------------------------


export function staticOne(): i32 {

    return Animal.ONE;

}
  
export function staticAdd(a: i32, b: i32): i32 {

    return Animal.add(a, b);
  
}
  
export function instanceTwo(): i32 {
 
    let animal = new Animal<i32>();

    return animal.two;

}
  
export function instanceSub(a: f32, b: f32): f32 {

    let animal = new Animal<f32>();

    return animal.instanceSub<f32>(a, b);

}