module Functions {
  function sum() {
    //Convert arguments to array
    var nums = Array.prototype.slice.call(arguments);
    var total = 0;

    for (var i = 0; i < nums.length; i++) {
      total += nums[i];
    }

    return total;
  }

  sum(5, 5, 5, 5); //20
}