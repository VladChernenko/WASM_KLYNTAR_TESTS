import { JSON } from "assemblyscript-json";




export class Vector2D extends JSON.Obj {
    x: f32;
    y: f32;
    
    constructor(x: f32, y: f32) {
        super()
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

    getJSON():string{

        return this.stringify()
     
    }

}