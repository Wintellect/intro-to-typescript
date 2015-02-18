module Interface.FunctionTypes {
  interface ModifyIntFunc {
    (num: number): number;
  }

  function forEach(nums: number[], callback: ModifyIntFunc): void {
    for (var i = 0; i < nums.length; i++) {
      nums[i] = callback(nums[i]);
    }
  }

  var nums = [1, 2, 3, 4, 5];

  forEach(nums, function(num) {
    return num * num;
  });
}