//sample.ts
module Classes {
  class Person {
    private name: string;

    constructor(name) {
      this.name = name;
    }

    sayHello() {
      console.log(this.name);
    }
  }
}