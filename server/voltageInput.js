const phidget22 = require("phidget22")

const PHIDGET_PORT = 5661
let currentVoltage = 0

function poll({
  onInputAttached,
  onVoltageChange = voltage => {}
}) {
  const ch = new phidget22.VoltageInput(0)

  ch.onAttach = function(ch) {
    console.log(ch + " attached")
    setTimeout(() => onInputAttached(), 3000)
  }

  ch.onDetach = function(ch) {
    console.log(ch + " detached")
  }

  ch.onVoltageChange = function(voltage) {
    if (voltage !== currentVoltage) {
      console.log("voltage change: " + voltage + " (" + this.getVoltage() + ")")
      onVoltageChange(voltage)
      currentVoltage = voltage
    }
  }

  ch.onSensorChange = function(value, unit) {
    console.log("sensor change:" + value + unit["symbol"])
  }

  ch.open()
    .then(function(ch) {
      console.log("channel open")
    })
    .catch(function(err) {
      console.log("failed to open the channel:" + err)
    })
}

function main({ onConnected, onError, onInputAttached, onVoltageChange }) {
  console.log("Connecting to phidget network")
  const conn = new phidget22.Connection(PHIDGET_PORT, "localhost")
  conn
    .connect()
    .then(function() {
      console.log("Connected to network")
      poll({
        onVoltageChange,
        onInputAttached
      })
      onConnected()
    })
    .catch(function(err) {
      onError(err)
      console.error("Failed to connect", err)
    })
}

module.exports = main
