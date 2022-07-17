// Compiled with                asc test.ts -o test.wasm -O --exportRuntime



export function getX5(num:f32): f32 {

    for(let i: i32=0;i<5;i++){

        num++

    }
 
    return num;

}


export function cat( str1: string, str2: string ): string {
    return str1 + "|" + str2;
}

export class Vector2D {
    x: f32;
    y: f32;
    
    constructor(x: f32, y: f32) {
        this.x = x;
        this.y = y;
    }

    Magnitude(): f32 {
        return Mathf.sqrt(this.x * this.x + this.y * this.y);
    }


    add(vec2: Vector2D): Vector2D {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
        
    }

}


// Протестируем даты

export function getKlyntarData( str1: string, str2: string ): string {

    

}