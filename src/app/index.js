const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const cors = require("koa2-cors")
const initiaRoutes = require("../router")
const errorHandler = require("./error-handler")

const app = new Koa()

app.use(bodyparser())
app.use(cors())
initiaRoutes(app)
app.on("error", errorHandler)

module.exports = app