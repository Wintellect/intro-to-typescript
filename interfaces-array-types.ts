interface NumArray {
  [index: number]: number;
}

var nums: NumArray = [1, 2, 3, 4, 5];

//This is an object whose keys
// happen to be numbers
var arrayLikeObject: NumArray = {};
arrayLikeObject[0] = 1;
arrayLikeObject[1] = 2;

interface NameAgeMap {
  [index: string]: number;
}

var ages: NameAgeMap = {
  'Josh': 33,
  'Hadassah': 6,
  'Elijah': 4
};