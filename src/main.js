const app = require("./app")
const http = require("http")
const socket = require("socket.io")
const { APP_PORT } = require("./app/config")
const initiaSocketAction = require("./app/socket")

const server = http.createServer(app.callback())

server.listen(APP_PORT, () => {
  console.log("server is running");
})

const socketServer = socket(server, {
  cors: {
    origin: 'http://192.168.0.105:3000',
    credentials: true
  }
})

initiaSocketAction(socketServer)