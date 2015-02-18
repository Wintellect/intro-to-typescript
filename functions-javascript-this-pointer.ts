module Functions {
  class Person {
    constructor(public name: string) {}

    sayHelloLater(delay: number) {
      setTimeout(function() {
        alert("Hi, my name is " + this.name);
      }, delay);
    }
  }

  var josh = new Person('Josh');
  josh.sayHelloLater(2000);
}

module Functions {
  class Person {
    constructor(public name: string) {}

    sayHelloLater(delay: number) {
      var _this = this;

      setTimeout(function() {
        alert("Hi, my name is " + _this.name);
      }, delay);
    }
  }

  var josh = new Person('Josh');
  josh.sayHelloLater(2000);
}

module Functions {
  class Person {
    constructor(public name: string) {}

    sayHelloLater(delay: number) {
      setTimeout(() => {
        alert("Hi, my name is " + this.name);
      }, delay);
    }
  }

  var josh = new Person('Josh');
  josh.sayHelloLater(2000);
}