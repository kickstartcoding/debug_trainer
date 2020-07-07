const loggingIsOn = false

module.exports = {
  devLog: function (logString) {
    if (loggingIsOn) {
      console.log(logString)
    }
  }
}