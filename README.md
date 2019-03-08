# Phidget + NodeJs + WebSocket + React example (VoltageInput)

A simple phidget controller written in Javascript, using Nodejs and WebSocket to allow real time communication between browser and a Phidget Network.
Front-end based on React 16.8 (with hooks) and Next.js.

## Installation

1. Ensure that you have a Phidget USB Controller attached
2. Start the Phidget Network from the Phidget Control Panel. You don't need the web server, just the Network one.
3. Install deps: `npm install` or `yarn`
4. Run the development and launch server command: `npm run dev` or `yarn dev`

Point your browser to http://localhost:3000

**Note:** By convention it assumes the Network server is running on port 5561.
If you want or need to use a different port, you can specify an env var before launching the dev command:

     `PHIDGET_SERVER_PORT=<port> npm run dev`

## Troubleshooting

Make sure you don't have the Phidget Control Panel open when launching the run command, since it may cause sensor errors.

