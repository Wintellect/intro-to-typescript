interface IPerson {
  name: string;
  age?: number;
}

function describePerson(person: IPerson): void {
    var description = person.name;

    if (typeof person.age !== 'undefined') {
        description += " is " +
        person.age + " years old.";
    }

    console.log(description);
}

//Results in a compiler error
describePerson({ name: 'Josh' });

//Extra properties are ignored
describePerson({
    name: 'Josh',
    age: 33,
    company: 'Wintellect'
});