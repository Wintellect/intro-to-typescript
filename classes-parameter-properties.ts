module Classes.ParameterProperties {
  
//So this:
class Person {
  name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

//Can be shortened to this:
class Person {
  constructor(
    public name: string,
    private age: number) {
  }
}

}