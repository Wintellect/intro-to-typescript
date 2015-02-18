module Classes.Properties {
  class Name {
    constructor(
      public first: string,
      public last: string) {
    }

    get fullName(): string {
      return this.first + ' ' + this.last;
    }
  }

  var myName = new Name('Josh', 'Carroll');

  //No parenthesis necessary
  console.log(myName.fullName);

  //Runtime error if 'use strict'; is specified
  myName.fullName = 'Billy Bob';

  class Person {
    static defaultName = 'unknown';

    constructor(public name: string) {
      this.name = name || Person.defaultName;
    }
  }

class NameParser {
  static parseName(name): string {
    //some implementation here
  }
}

var parsedName = NameParser.parseName('Josh Carroll');
}