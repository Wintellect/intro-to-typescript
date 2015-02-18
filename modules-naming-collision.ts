//file-one.js
var name = 'Josh';

function sayName(){
   console.log(name);
}

//file-two.js
var name = 'Sally';

function sayName(){
   console.log(name);
}

//IIFE
(function() {

  var name = 'Josh';

  function sayName() {
    console.log(name);
  }

}());