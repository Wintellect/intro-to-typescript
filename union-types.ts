var dob: string|Date;

dob = '1/1/1975';

dob = new Date(1975, 1, 1);

//Compiler error
dob = 123;

//Type Guard

//Full intellisense
// TypeScript is smart enough to figure out
// based on context what the type is.
function getAge(dob: string|Date) {
    if (typeof dob === 'string') {
        dob.trim();
    } else {
        dob.toUTCString();
    }
}