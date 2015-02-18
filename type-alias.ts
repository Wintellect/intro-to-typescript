type StringArray = string[];

type StringOrNum = string | Number;

var names: StringArray = ['Josh', 'Jeff'];

var age: StringOrNum = 33;
age = '33';

function forEachBefore(nums: number[], iter: (num: number, index?: number, collection?: number[]) => number) {
    //forEach code
}

type Iterator = (num: number, index?: number, collection?: number[]) => number;

function forEach(nums: number[], iter: Iterator) {
    //forEach code
}