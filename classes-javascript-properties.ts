module Classes.JavaScript.Properties {

  function Person() {}

  Object.defineProperty(Person.prototype, "name", {
    get: function() {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });

}

module Classes.JavaScript.Properties {
function Person(name) {
  this.name = name || Person.defaultName;
}

Person.defaultName = 'unknown';
}