module Functions {
  function forEach(collection, callback) {
    for (var i = 0; i < collection.length; i++) {
      callback(collection[i], i, collection);
    }
  }

  var nums = [1, 2, 3, 4, 5];

  forEach(nums, (num, i, list) => {
    var previous = list[i - 1] || 0;

    console.log("" + list[i] + " + " + previous +
      " = " + (list[i] + previous));
  });
}

module Functions {
  interface Iterator<T> {
    (item: T, index: number, collection: T[]): void;
  }

  function forEach<T>(collection: T[], callback: Iterator<T>) {
    for (var i = 0; i < collection.length; i++) {
      callback(collection[i], i, collection);
    }
  }

  var nums = [1, 2, 3, 4, 5];

  forEach(nums, (num:number, i:number, list:number[]) => {
    var previous = list[i - 1] || 0;

    console.log("" + list[i] + " + " + previous +
      " = " + (list[i] + previous));
  });
}