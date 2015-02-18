function add(a: number, b: number): number {
    return a + b;
}

//Results in compiler error
var x: string = add(5, 5);

//Results in compiler error
var y: number = add('abc', 123);

//Implicitly typed by return value
var z = add(5, 5);

//Results in compiler error
z = 'abc';