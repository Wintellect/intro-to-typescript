module MyModule {
  var secret = "I'm a secret.";

  export class Foo { }
}

module MyModule {
  export class Bar { }

  //Results in compiler error
  var secret = MyModule.secret;
}

var foo = new MyModule.Foo();
var bar = new MyModule.Bar();