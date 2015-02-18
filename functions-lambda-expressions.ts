module Functions {
  function modify(nums: number[], modifier: (num: number) => number) {
    for (var i = 0; i < nums.length; i++) {
      nums[i] = modifier(nums[i]);
    }
  }

  var nums = [1, 2, 3, 4, 5];

  modify(nums, function(num) {
    return num * num;
  });

  modify(nums, n => n * n);

  var sum = (a: number, b: number) => a + b;

  sum(21, 21); //42
}