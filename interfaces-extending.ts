interface OpenPerson {
  name:string;
}

interface OpenPerson {
  age: number;
}

interface OpenPerson {
  company: string;
}

var person:OpenPerson = {
  name: 'Josh',
  age: 33,
  company: 'Wintellect'
}

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