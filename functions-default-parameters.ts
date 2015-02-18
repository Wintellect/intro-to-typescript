module Functions {
  function log(msg: string, level: string = "log") {
    console[level](msg);
  }

  log("Just a normal log message");

  log("Danger will robinson!", "warn");
}