export function getX5(num:i32): i32 {

    for(let i: i32=0;i<5;i++){

        num++

    }
 
    return num;

}

export function getX7(num:i32): i32 {

    for(let i: i32=0;i<7;i++){

        num++

    }
 
    return num;

}


export function testLambda(num1:i32,num2:i32=22): i32 {

    return num1*num2

}