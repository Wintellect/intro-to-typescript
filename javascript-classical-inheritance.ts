module Classes.JavaScript.ClassicalInheritance {

  function Person(name) {
    this.name = name;
  }

  Person.prototype.sayHello = function() {
    console.log('Hello, my name is ' + this.name);
  };

  function Worker(name, company) {
    Person.call(this, name);
    this.company = company;
  }

  Worker.prototype = Object.create(Person.prototype);
  Worker.prototype.constructor = Worker;

  Worker.prototype.sayHello = function() {
    Person.prototype.sayHello.call(this);
    console.log('And I work for ' + this.company);
  }

  var josh = new Worker('Josh', 'Wintellect');
  josh.sayHello();

}