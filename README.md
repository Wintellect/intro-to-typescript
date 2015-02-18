#Getting Started With TypeScript

##What we will cover

- Overview / What is TypeScript?
- Type Annotations
- Interfaces
- Classes
- Modules
- Functions

#Overview / What is TypeScript?

##Not a new language

###Based on ES6
TypeScript is not a new language, but based on the ECMA Script 6 proposal. It is designed to add type annotations to JavaScript that can be compile time checked.

###Superset
TypeScript is a superset of JavaScript. This means that **ALL** JavaScript is valid TypeScript.

In fact if you wanted to get started with TypeScript today, then you could just change all your `.js` files to `.ts` and everything would compile just fine.

###Transpiled
TypeScript gets compiled (or transpiled) down to a specific version of JavaScript. You can target ES5, ES3, and as of TypeScript 1.4, ES6.

The result is clean idomatic JavaScript that is pretty readable.

If we had a `sample.ts` file like this:

```
module Classes{
   class Person{
      private name:string;

      constructor(name){
         this.name = name;
      }

      sayHello(){
         console.log(this.name);
      }
   }
}
```

Will compile into this `sample.js` file:
```
var Classes;
(function (Classes) {
    var Person = (function () {
        function Person(name) {
            this.name = name;
        }
        Person.prototype.sayHello = function () {
            console.log(this.name);
        };
        return Person;
    })();
})(Classes || (Classes = {}));
```

You can try this yourself at http://www.typescriptlang.org/Playground

##Motivation

###ECMA Script 6

JavaScript is going to get a bit of a makeover with ES6 and that includes some very different syntax than is currently available in ES5.

Things like classes:

```
class Foo {
  constructor(bar){
	  this.bar = bar;
  }
}
```

Lambda Expressions:

```
var items = ['one', 'two', 'three'];

items.forEach(item => console.log(item));
```

Template Strings:

```
var rectangle = { height: 20, width: 10 };
var areaMessage = `Rectangle area is ${rectangle.height * rectangle.width}`;
```

It would be impractical to wait until the full ES6 spec was supported before writing a single line of code, so tools like [Traceur](https://code.google.com/p/traceur-compiler/), [6to5](https://6to5.org/) and [TypeScript](http://www.typescriptlang.org/) can help to bridge the gap today, while still providing support for browsers that don't support ES6 yet.

###Scalability
JavaScript was written a long time ago when the web was very young. And while it is a very powerful language, it wasn't written with the intention of supporting the kind of applications, and the massive code bases we are seeing today.

TypeScript provides a non-intrusive type system that allows static analysis to catch many errors before they ever make it into production. This extra layer of analysis can also greatly aid larger teams of developers by making the code more discoverable by the IDE.

#Type Annotations

TypeScript allows you to annotate variables, parameters, and methods with type information that can later be checked by the compiler.

The basic syntax is:

`<expression>: <type>`

So if you had a variable called `age` you could tell TypeScript that it was number like this:

`var age: number;`

This type information will be checked by the compiler, and an error produced if a value that isn't numeric is assigned to `age`

```javascript
//This is ok
age = 32;

//This will be an error
age = 'Not a number';
```

##Basic Types

TypeScript has 7 basic types:

- Boolean
- Number
- String
- Array
- Enum
- Any
- Void

###Boolean, Number, and String

```javascript
//Boolean
var isAnswer: boolean = true;

//Number
var val: number = 42;

//String
var name: string = 'Deep Thought';
```

###Arrays

Arrays can be expressed in one of two ways; by adding square brackets to a type annotation `[]` or by using the generic array syntax `Array<number>`

```javascript
//Array of numbers
var ages: number[] = [33, 16, 27];

//Array of strings
var names: Array<string> = ['Josh', 'Jeff', 'Susan'];
```

###Enums

Enums are one advantage of TypeScript that isn't available in JavaScript today.

```
enum Severity { High, Medium, Low };

var mySeverity: Severity = Severity.High;
```

Enums also allow you to get the name given it's numeric value: 

```
enum Severity { High, Medium, Low };

var high = Severity[0]; // 'High'
```

###Any

JavaScript is an untyped language, meaning it has no statically defined types. This means there are many instances where it is either necessary, or desirable to be able to leave this behavior in tact.

The `any` type allows you to maintain the default dynamic behavior of JavaScript within your TypeScript applications.

```
//No complaints
var whatever: any = 123;

//Also good
whatever = 'Just a string';
```

####Mixed Type Arrays

The `any` keyword is useful when an array can contain different types.

```
var mixedBag: any[] = ['abc', 123, true, {foo:'bar'}];
```

###Void

The `void` type is really only used for functions. In JavaScript a function always returns a value, but if you don't explicitly include a `return` statement, then that value will be `undefined`.

In order to tell TypeScript that a function returns no value, you can use the `void` type.

```
function noReturnValue(): void {
   console.log('I just do stuff');
}
```

##Type Annotations With Functions

Type annotations can be added to parameters in order to ensure that only appropriate values are being passed in. They can also be added after a function to denote the appropriate return value.

```
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
```

##Union Types

JavaScript does not allow you to overload functions, so many API designers will create very flexible functions that can handle different types for the same parameter.

An example is the ability to take a `string` or a `Date` into a function to calculate someone's age.

```
//No type checking or intellisense
function getAge(dob:any){
	if(typeof dob === 'string'){
		dob.trim();
	}else{
		dob.toUTCString();
	}
}
```

TypeScript 1.4 introduced the concept of **Union Types** to address this very common scenario.

You can define a Union Type by appending alternate types to a declaration using the `|` pipe symbol.

```
//Full intellisense
// TypeScript is smart enough to figure out
// based on context what the type is.
function getAge(dob:string|Date){
	if(typeof dob === 'string'){
		dob.trim();
	}else{
		dob.toUTCString();
	}
}
```

##Type Aliases

As you will see later, function type declarations can sometimes get pretty verbose. Again, TypeScript 1.4 has provided a new feature to allow us to alias complex types and use those to cut down on the ceremony of our code.

**Callback definition before:**
```
function forEach(nums:number[], iter:(num:number, index?:number, collection?:number[]) => number){
	//forEach code
}
```
**Callback definition after:**
```
type Iterator = (num:number, index?:number, collection?:number[]) => number;

function forEach(nums:number[], iter:Iterator){
	//forEach code
}
```

#Interfaces

JavaScript relies strongly on the idea of Duck Typing.

>**Duck Typing**
>
> ...duck typing is a style of typing in which an object's methods and
> properties determine the valid semantics, rather than its inheritance
> from a particular class or implementation of an explicit interface.
>
>Source: [Wikipedia](http://en.wikipedia.org/wiki/Duck_typing)

I other words, in JavaScript, I don't care if it actually ***IS*** a duck. I just want to know if it **quacks** like a duck, **walks** like a duck, and **swims** like a duck.

##Basic Interface

Many times we might write a function that takes an object as an input, and we simply check to see if it has certain properties on it. This might look something like this in JavaScript:

```
function describePerson(person){
   var description = person.name + " is " +
       person.age + " years old.";

   console.log(description);
}
```

In this particular example I don't really care what object you pass in, so long as it has a `name` and `age` property on it.

I could call it like this:

```
describePerson({name:'Josh', age:33});
```

This is a powerful feature in JavaScript, but it means I have to code very defensively and validate my inputs to ensure it fails gracefully. It also means that the API has to be well documented in order for the called to understand *what to pass in.*

TypeScript allows you to declare interfaces that provide the compiler with information to enforce **structural equivalence**.

Taking our previous example, we can define an interface with the properties we desire. That interface can then be used as a type annotation on the input to our function.

```
interface IPerson {
   name: string;
   age: number;
}

function describePerson(person: IPerson): void {
   var description = person.name + " is " +
       person.age + " years old.";

   console.log(description);
}
```

TypeScript can now inspect objects we pass in to ensure they meet the structural requirements defined by the interface.

```
//Results in a compiler error
describePerson({name:'Josh'});

//Extra properties are ignored
describePerson({
   name:'Josh', 
   age:33, 
   company:'Wintellect'
});
```
 
##Optional Properties

Due to the untyped nature of JavaScript, it does not allow for function overloading. Therefore a common practice is to create API's which take in a object that represents all possible parameters that a function might use. Many times, only a handful of properties are actually required.

Consider our example from earlier, except that we are going to make the age optional in our function.

```
function describePerson(person: IPerson): void {
   var description = person.name;

   if(typeof person.age !== 'undefined'){
      description += " is " +
       person.age + " years old.";
   }
   
   console.log(description);
}
```

`IPerson` requires both a `name` and `age` property to be considered structurally equivalent, so if we try to call it with only a `name`, it will result in a compiler error.

We can make properties options by appending a `?` to them in our interface definition.

```
interface IPerson {
   name: string;
   age?: number;
}

//No compiler error
describePerson({name:'Josh'});
```

##Function Types

Interfaces can be used to describe functions as well. A real world example might be an instance where you are expecting a callback function.

```
interface ModifyIntFunc {
   (num: number): number;
}

function forEachInt(nums: number[], callback: ModifyIntFunc): void {
   for(var i = 0; i < nums.length; i++){
      nums[i] = callback(nums[i]);
   }
}

var nums = [1, 2, 3, 4, 5];

forEachInt(nums, function(num){
   return num * num;
});
```

##Array Types

You can also describe array types using interfaces by using a special `[index:<number|string>]` identifier. Index identifiers can only be one of two types, `string` and `number`.

```
interface NumArray {
	[index:number]: number;
}

var nums:NumArray = [1,2,3,4,5];
```

This might seem unnecessary at first considering we already covered how you can easily describe array types in TypeScript. However, when you consider that all objects *(including arrays)* in JavaScript are just associative arrays, then you can begin to see where this is useful.

```
interface NumArray {
	[index:number]: number;
}

//This is an object whose keys
// happen to be numbers
var arrayLikeObject:NumArray = {};
arrayLikeObject[0] = 1;
arrayLikeObject[1] = 2;

interface NameAgeMap {
	[index:string]: number;
}

var ages:NameAgeMap = {
	'Josh':33,
	'Hadassah':6,
	'Elijah':4
};
```

##Extending Interfaces

In the course of your development work, it may be useful to compose interfaces, or extend them without having to recreate them from scratch every time.

TypeScript allows you to do this via the `extends` keyword. **An interface can extend one or more other interfaces.**

```
interface IName {
   name: string;
}

interface IAge {
   age: number;
}

interface IWorker extends IName, IAge {
   company: string;
}

//The Angle bracket syntax <T> here
// is a Type Assertion Expression
var josh = <IWorker>{};
josh.name = 'Josh';
josh.age = 33;
josh.company = 'Wintellect';
```
 
#Classes

JavaScript doesn't really have a concept of *classes* in the traditional sense. Everything in JavaScript is an object, and objects inherit directly from other objects, not classes.

This concept is called [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

For developers used to a more classical object oriented paradigm, the prototypal model can be difficult to master.

Here is a simple example of how to simulate classical inheritance in JavaScript.

```
function Person(name){
   this.name = name;
}

Person.prototype.sayHello = function(){
   console.log('Hello, my name is ' + this.name);
};

function Worker(name, company){
   Person.call(this, name);
   this.company = company;
}

Worker.prototype = Object.create(Person.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.sayHello = function(){
   Person.prototype.sayHello.call(this);
   console.log('And I work for ' + this.company);
}

var josh = new Worker('Josh', 'Wintellect');
josh.sayHello();
```

This will work, but is very difficult to reason about. There have been thousands of articles written on this topic, and dozens of books.

ES6 Introduces a new keyword `class` to help make this type of inheritance in JavaScript easier, but it's important to note that **it is just syntactic sugar** to the example above.

**It's important to understand what is really going on. If you don't learn the prototypal model, you will always struggle with aspects of JavaScript.**

*Note: I recommend watching James Shore's vido available at [www.objectplayground.com](http://www.objectplayground.com/).*

Because TypeScript is based on ES6, we can take advantage of the `class` syntax.

Let's look at the same example as above as we would do it in TypeScript.

```
class Person{
	name:string;
	
	constructor(name:string){
		this.name = name;
	}
	
	sayHello(){
		console.log(`Hello, my name is ${this.name}`);
	}
}

class Worker extends Person{
	company:string;
	
	constructor(name:string, company:string){
	   super(name);
	   this.company = company;
	}
	
	sayHello(){
		super.sayHello();
		console.log(`And I work for ${this.company}`);
	}
}

var josh = new Worker('Josh', 'Wintellect');
josh.sayHello();
```

##Private Members

In JavaScript, you can achieve private variables through the use of closures, but this doesn't play nicely with the `prototype` property. As a convention, JavaScript programmers have been using the underscore `_` to prefix any methods or properties on their objects that are intended to be private.

TypeScript actually gives us a keyword that we can prefix our members with in order to enforce access levels at compile time via the `private` keyword.

****Note: `public` is the default modifier in JavaScript! ****

```
class Counter {
	private _count: number = 0;

	private _incrementBy(num){
		this._count += num;
	}

	increment(){
		this._incrementBy(1);
	}
}

var coinTosses = new Counter();

//Results in compile error
coinTosses._incrementBy(10);

//Results in compile error
coinTosses._count = 10;
```

It's important to note that this is still just JavaScript, and therefore these properties can still be accessed. **They aren't truly private, we are just pretending they are.**

##Parameter Properties

Many times the properties on your class are just going to be initialized directly from the constructor, and therefore declaring them on the class, and in the constructor, and then assigning them is just a lot of ceremony.

TypeScript allows you to optionally prefix each of your constructor parameters with an access modifier `private` or `public` as a shorthand for this pattern.

```
//So this:
class Person {
   name: string;
   private age: number;

   constructor(name:string, age:number){
      this.name = name;
      this.age = age;
   }
}

//Can be shortened to this:
class Person {
   constructor(
	   public name:string, 
	   private age:number){
   }
}
```

The underlying JavaScript generated is **100% identical**.

##Property Accessors

Because information hiding is one of the key design principles behind Object Oriented Programming, it's often desirable to be able to create accessors instead of simply making properties public.

ECMA Script 5 actually provides JavaScript with a mechanism for being able to define **getter / setter** type access to a property through the `Object.defineProperty` method. However, the syntax is verbose and clunky:

```
function Person() {}

Object.defineProperty(Person.prototype, "name", {
    get: function () {
        return this._name;
    },
    enumerable: true,
    configurable: true
});
```

TypeScript provides nice syntactic sugar to define property accessors using the `get` and `set` keywords.

```
class Name {
   constructor(
	   public first:string,
       public last:string){
   }
   
   get fullName(): string {
	   return `${this.first} ${this.last}`;
   }
}

var myName = new Name('Josh', 'Carroll');

//No parenthesis necessary
console.log(myName.fullName);

//Runtime error if 'use strict'; is specified
myName.fullName = 'Billy Bob';
```

##Static Members

Remember that in JavaScript there is really no such thing as a class, only objects. What we are calling a class is really just a function, and functions are first class citizens in JavaScript. So, while constructor functions are used to create instances of objects via the `new` operator, **they are also objects that can have properties and methods**.

In JavaScript that might look something like this:

```
function Person(name){
	this.name = name || Person.defaultName;
}

Person.defaultName = 'unknown';
```

We can accomplish this in TypeScript by using the `static` keyword.

```
class Person {
	static defaultName = 'unknown';
	
	constructor(public name:string){
		this.name = name || Person.defaultName;
	}
}
```

`static` can also be used to decorate methods in the same way to make them available directly on the constructor function itself.

```
class NameParser {
   static parseName(name): string {
      //some implementation here
   }
}

var parsedName = NameParser.parseName('Josh Carroll');
```

#Modules

##JavaScript Scope

One of the fundamental concepts in JavaScript, and in other languages as well, is scoping. Remember that everything in JavaScript is an object, so there are no classes and namespaces to differentiate between identifiers.

When you declare variables and functions they are contained within their respective scope. JavaScript has a single global scope (the window object in browsers), and then lexical function scope after that.

This can result in naming collisions if two files add declarations to the global scope with the same name.

**Note: ES6 introduces the `let` keyword, which allows you to have block level scope, but is not covered in this introduction.**

Consider the following two files

**file-one.js**
```
var name = 'Josh';

function sayName(){
   console.log(name);
}
```

**file-two.js**
```
var name = 'Sally';

function sayName(){
   console.log(name);
}
```

Whichever of these two files gets loaded last will overwrite the declarations of the first. This is a contrived example, but much more subtle bugs can arise from naming collisions like this.

To avoid polluting the global scope like this, JavaScript developers began using anonymous functions that were executed immediately to wrap their scripts in.

```
(function(){

   var name = 'Josh';

   function sayName(){
      console.log(name);
   }

}());
```

This pattern is called an **IIFE** *(pronounced IF-ee)*, or [I]mmediately [I]nvoked [F]unction [E]xpression.

##TypeScript `module` Keyword

###Basic Module

TypeScript provides us with the `module` keyword to avoid issues with naming collisions between our files.

```
module MyModule {
   class MyClass {
   }
}
```

###Sharing Code With `export`

By default, a module does not expose it's internal constructs, and is therefore unavailable to anything outside of that module. In order to be able to use **interfaces**, **classes**, **functions**, and **variables** we have to use the `export` keyword.

Exporting will make a construct available externally on the module itself as a property. You can reference them using `ModuleName.ExportedMember`.

```
module One {
   export class Shared{}
   
   class Hidden{}
}

var shared = new One.Shared();

//Will result in compiler error
var hidden = new One.Hidden();
```

###Extending Modules

Modules in TypeScript are not closed. This means you can extend an existing module and add new members to it. This is useful when organizing your project because you can use modules much the way you would a namespace.

It's important to note however, that just because you are extending a module, it does not give you access to the internal members in another declaration of the same module.

```
module MyModule{
	var private = "I'm a secret.";
	
	export class Foo {}
}

module MyModule{
   export class Bar {}

   //Results in compiler error
   var secret = MyModule.private;
}

var foo = new MyModule.Foo();
var bar = new MyModule.Bar();
```

###Multiple Files

A good application structure is imperative to working on a modern JavaScript application, and that involves splitting your application code out into many individual files.

So if we split our files apart how do we tell the TypeScript compiler what files we are making use?

Much the same way that a `using` statement works in **C#**, TypeScript is able to read the `/// <reference path="" />` XML comments at the top of your `.ts` files.

So if we had one file that needed to use types from another file, then you simply reference it at the top using the relative path.

**utils.ts**
```
module Utils {
	export function sayHello(){
		console.log('Hello');
	}
}
```
**app.ts**
```
/// <reference path="utils.ts" />

Utils.sayHello();
```

Running the compiler manually on **app.ts** will allow it to bring in the necessary files, compile them and generate the complete `*.js` file necessary.

>`tsc app.ts`

Will generate `app.js` file that looks like this:

```
var Utils;
(function (Utils) {
    function sayHello() {
        console.log('Hello');
    }
    Utils.sayHello = sayHello;
})(Utils || (Utils = {}));
/// <reference path="utils.ts" />
Utils.sayHello();
```

#Functions

Functions are the heart and soul of JavaScript. As such, they will be used more than anything else in your code.

TypeScript provides a rich set of features for not only working with functions, but describing what they do via type annotations.

##Parameter and Return Types

As you have already seen from the `class` examples, functions can have type annotations on their parameters, and return types.

```
function add(a: number, b: number): number {
   return a + b;
}
```

##Function Types

In JavaScript we can assign a function to a variable, but how would you express the **type** of a function?

Describing a function type in TypeScript basically involves declaring both the parameters and the return type of a function.

```
var add: (a: number, b: number) => number;

add = function(a: number, b: number){
	return a + b;
};
```

This is useful when declaring parameters or properties that are intended to be functions of a particular type.

```
interface IHttpOptions {
   url: number;
   method: string;
   callback: (data: any) => void;
}

function ajaxCall(options: IHttpOptions){
   //make an XHR call here
}
```

##Optional Parameters

In JavaScript, there are no rules enforced at runtime as to how many arguments, or of what type are passed into functions. This can be used to our advantage to make flexible API's.

Just as the `interface` keyword allows you to have optional properties, functions in TypeScript can have optional parameters. Placing a `?` character immediately following the name of a parameter will indicate this is an optional parameter.

```
function salutation(name: string, age?: number): void {
	console.log(`Hello, my name is ${name}`);

	if(age){
		console.log(`And I am ${age} years old.`);
	}
}

salutation('Josh');

salutation('Josh', 33);
```

##Default Parameters

In addition, you may wish to provide default values for optional parameters.

You can do this by simply providing the default value directly in the list of parameters. `param = value`

Even though we are not including the `?` operator after our parameter name, it is automatically considered optional by defining a default value.

```
function log(msg: string, level: string = "log") {
   console[level](msg);
}

log("Just a normal log message");

log("Danger will robinson!", "warn");
```

##Rest Parameters

A common programming need is to be able to create functions that can operate over a variable number of parameters. In JavaScript, a common technique is to make use of the `arguments` variable in order to support a variable number of arguments.

Every function in JavaScript has access to the `arguments` object, but it isn't really an array, it's only an [**array like**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#Array-like) structure. This means you have to convert it to an array in order to be able to iterate over each item in the collection.

An example of how this is done in ES5 JavaScript.

```
function sum(){
	var nums = Array.prototype.slice.call(arguments);
	var total = 0;

	for(var i = 0; i < nums.length; i++){
		total += nums[i];
	}

	return total;
}
```

This is a simple example, but you can imagine how a more sophisticated API might require quite a bit of logic just to deal with known parameters, while still supporting a variable number of parameters at the end.

For this reason, ECMA Script 6 includes new syntax for **Rest Parameters**. They are defined by prefixing the parameter with an ellipsis `...` to indicate that **zero or more** parameters will be passed in. When you access this parameter in the body of the function, it is treated just like an array.

```
function sum(...nums: number[]): number {
	var total = 0;

	for(var i = 0; i < nums.length; i++){
		total += nums[i];
	}

	return total;
}

var total = sum(5, 5, 5, 5);

console.log(total);
```

##Lambda Expressions

Anonymous functions are used quite a bit in JavaScript, but writing them out can be verbose even for simple cases. Many languages have support for lambda expressions designed to greatly reduce the ceremony involved in such a common programming construct.

ES6 is also going to bring this feature to JavaScript, and TypeScript provides full support for this new syntax. For C# developers, this will look very familiar.

Here are two examples of the exact same function, one using the standard `function` keyword, and the other using a lambda expression.

```
function modify(nums: number[], modifier: (num:number) => number){
	for(var i = 0; i < nums.length; i++){
		nums[i] = modifier(nums[i]);
	}
}

var nums = [1,2,3,4,5];

modify(nums, function(num){
	return num * num;
});

modify(nums, n => n*n);
```

Lambda expressions can also be used to create function expressions complete with all the same type annotations you are used to.

```
var sum = (a: number, b: number) => a + b;
```

##Lambda's and `this`

One issue that trips up new JavaScript developers is the dynamic binding of the `this` pointer. In JavaScript, `this` is dependent on how it is called and not where it is declared. This can be confusing for developers coming from Java or C#, and lead to some fairly common mistakes.

A great example are callbacks within a class.

```
class Person {
	constructor(public name: string){}

	sayHelloLater(delay: number){
		setTimeout(function(){
			alert(`Hi, my name is ${this.name}`);
		}, delay);
	}
}

var josh = new Person('Josh');
josh.sayHelloLater(2000);
```

Because `this` is dependent on ***HOW*** the function is called, and not where it is defined, we end up with a bug. In the `sayHelloLater` function, when it is actually executed, it isn't attached to an instance of any object because `setTimeout` is the one executing it. This means that `this` is actually bound to the global scope, and therefore `window.name` is actually `undefined`.

**IMPORTANT:** *this is exactly why you should always put `'use strict';` at the top of your functions. Except in very old browsers, it will throw an error in that scenario instead of silently binding `this` to the global scope.*

This can be mitigated by using either the `bind()` function, or via the use of closures. 

The use of closures to capture the current value of `this` is a fairly common technique used today.

```
class Person {
	constructor(public name: string){}

	sayHelloLater(delay: number){
		var _this = this;

		setTimeout(function(){
			alert(`Hi, my name is ${_this.name}`);
		}, delay);
	}
}

var josh = new Person('Josh');
josh.sayHelloLater(2000);
```

However, lambda expressions have the unique property of having their `this` pointer bound to the scope in which they were declared.

So we can rewrite our sample to use a lambda expression `this` will work like we think it should have in the first place.

```
class Person {
	constructor(public name: string){}

	sayHelloLater(delay: number){
		setTimeout(() => {
			alert(`Hi, my name is ${this.name}`);
		}, delay);
	}
}

var josh = new Person('Josh');
josh.sayHelloLater(2000);
```

Under the hood TypeScript will simply generate a closure for you if you are compiling down to ES5 or ES3.

##Generics

As with any programming language there are always bits of logic that are useful regardless of the type they are operating over. We could certainly get around this by just using the `any` type, but that defeats the purpose of using TypeScript in the first place.

A good example of this is a simple `forEach` loop that iterates over a homogeneous collection.

```
function forEach(collection, callback){
	for(var i = 0; i < collection.length; i++){
		callback(collection[i], i, collection);
	}
}

var nums = [1,2,3,4,5];

forEach(nums, (num, i, list) => {
	var previous = list[i - 1] || 0;

    console.log(`${list[i]} + ${previous} = ${list[i] + previous}`);
});
```

This certainly works, but we completely lose all type information within our callback.

TypeScript does however provide a mechanism for defining generic type annotations so we can work with this type of function and have full type information based on the collection we are using.

```
function forEach<T>(collection: T[], callback: (item:T, index:number, collection:T[]) => void){
	for(var i = 0; i < collection.length; i++){
		callback(collection[i], i, collection);
	}
}

var nums = [1,2,3,4,5];

forEach(nums, (num, i, list) => {
	var previous = list[i - 1] || 0;

    console.log(`${list[i]} + ${previous} = ${list[i] + previous}`);
});
```

> Written with [StackEdit](https://stackedit.io/).
