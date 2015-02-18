module Functions {
  function sum(...nums: number[]): number {
    var total = 0;

    for (var i = 0; i < nums.length; i++) {
      total += nums[i];
    }

    return total;
  }

  var total = sum(5, 5, 5, 5);

  console.log(total);
}