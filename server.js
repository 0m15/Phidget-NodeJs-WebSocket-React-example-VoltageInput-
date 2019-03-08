const next = require("next")
const app = require("express")()
const bodyParser = require("body-parser")
const { parse } = require("url")
const port = parseInt(process.env.PORT) || 3000
const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const voltageInput = require("./server/voltageInput")

const server = require("http").Server(app)
const io = require("socket.io")(server)

let phidgetNetworkConnected = false

nextApp.prepare().then(() => {
  app.use(bodyParser())

  app.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

  // voltageInput interface
  if (!phidgetNetworkConnected) {
    phidgetNetworkConnected = true
    voltageInput({
      onConnected: () => {
        io.emit("PHI", {
          message: "CONNECTED"
        })
      },
      onInputAttached: () => {
        io.emit("PHI", {
          message: "SENSOR_ON"
        })
      },
      onError: err => {
        io.emit("PHI", {
          message: "ERROR"
        })
      },
      onVoltageChange: voltage => {
        io.emit("PHI", {
          message: "VOLTAGE_CHANGE",
          voltage
        })
      }
    })
  }
})
