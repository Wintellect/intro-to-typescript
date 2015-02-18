module Functions {
  var add: (a: number, b: number) => number;
  var log: (msg: string) => void;

  add = function(a: number, b: number) {
    return a + b;
  };

  interface IHttpOptions {
    url: number;
    method: string;
    callback: (data: any) => void;
  }

  function ajaxCall(options: IHttpOptions) {
    //make an XHR call here
  }
}