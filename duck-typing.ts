module DuckTyping.JavaScript {

  function describePerson(person) {
    var description = person.name + " is " +
      person.age + " years old.";

    console.log(description);
  }

  describePerson({ name: 'Josh', age: 33 });

}