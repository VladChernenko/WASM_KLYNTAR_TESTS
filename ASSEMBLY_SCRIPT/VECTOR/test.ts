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


