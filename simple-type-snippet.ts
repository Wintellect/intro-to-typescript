//Boolean
var isAnswer: boolean = true;

//Number
var val: number = 42;

//String
var name: string = 'Deep Thought';

//Array of numbers
var ages: number[] = [33, 16, 27];

//Array of strings
var names: Array<string> = ['Josh', 'Jeff', 'Susan'];

//Enums
enum Severity { High, Medium, Low };

//Becomes named type
var mySeverity: Severity = Severity.High;

//Numeric value returns name
var high = Severity[0]; // 'High'

//Any
//No complaints
var whatever: any = 123;

//Also good
whatever = 'Just a string';

var mixedBag: any[] = [
  'abc', 123, true, { foo: 'bar' }
];

//Void
function noReturnValue(): void {
    console.log('I just do stuff');
}