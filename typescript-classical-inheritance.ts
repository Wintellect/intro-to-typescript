module Classes.ClassicalInheritance {

class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

class Worker extends Person {
  company: string;

  constructor(name: string, company: string) {
    super(name);
    this.company = company;
  }

  sayHello() {
    super.sayHello();
    console.log(`And I work for ${this.company}`);
  }
}

var josh = new Worker('Josh', 'Wintellect');
josh.sayHello();

}