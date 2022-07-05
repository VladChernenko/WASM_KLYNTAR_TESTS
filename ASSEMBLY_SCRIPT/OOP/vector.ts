class Vector2D {

    //Fields
    x: f32;
    y: f32;
    
    constructor(x: f32, y: f32) {
     this.x = x;
     this.y = y;
    }
}


export function Magnitude(v1:Vector2D): f32 {

    return Mathf.sqrt(v1.x * v1.x + v1.y * v1.y);
    
}

export function add(vec1: Vector2D,vec2: Vector2D): Vector2D {
    
    this.x += vec2.x;
    this.y += vec2.y;
    
    return new Vector2D(vec1.x+vec2.x,vec1.y+vec2.y)
        
}