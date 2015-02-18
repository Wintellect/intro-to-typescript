module Functions {

function salutation(name: string, age?: number): void {
  console.log(`Hello, my name is ${name}`);

  if (age) {
    console.log(`And I am ${age} years old.`);
  }
}

salutation('Josh');

salutation('Josh', 33);

}