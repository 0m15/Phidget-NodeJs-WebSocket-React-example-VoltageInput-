import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const events = {
  CONNECTED: "CONNECTED",
  WS_CONNECTED: "WS_CONNECTED",
  VOLTAGE_CHANGE: "VOLTAGE_CHANGE",
  ERROR: "ERROR",
  SENSOR_ON: 'SENSOR_ON',
}

export default function Controller() {
  const [connected, setConnected] = useState(false)
  const [voltage, setCurrentVoltage] = useState(0)

  const handleMessages = data => {
    console.log('[i] data', data)
    switch (data.message) {
      case events.WS_CONNECTED:
        return setConnected(true)
      case events.VOLTAGE_CHANGE:
        document.title = 'Current voltage: ' + data.voltage
        return setCurrentVoltage(data.voltage)
    }
  }

  const s = io()
  useEffect(() => {
    s.on("PHI", handleMessages)

    return function cleanup() {
      s.removeListener("PHI")
    }
  })

  return (
    <div>
      <h1>Phidget Controller</h1>
      {/* <div>Connected to ws: {connected ? "YES" : "NO"}</div> */}
      {/* <div>Sensor status: {sensorConnected ? "CONNECTED" : "N/A"}</div> */}
      <div>Current Voltage: {voltage}</div>
    </div>
  )
}
