export class Foo {

    constructor(public str: string) {}
    
    getString(): string {
        return this.str
    }
  
}
  

  
export function getFoo(): Foo { // this one

    return new Foo("Hello world!")
  
}