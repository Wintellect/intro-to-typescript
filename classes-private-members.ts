module Classes.PrivateMembers {

  class Counter {
    private _count: number = 0;

    private _incrementBy(num) {
      this._count += num;
    }

    increment() {
      this._incrementBy(1);
    }
  }

  var coinTosses = new Counter();

//Results in compile error
  coinTosses._incrementBy(10);

//Results in compile error
  coinTosses._count = 10;

}