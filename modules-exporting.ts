module One {
  export class Shared {}

  class Hidden {}
}

var shared = new One.Shared();

//Will result in compiler error
var hidden = new One.Hidden();