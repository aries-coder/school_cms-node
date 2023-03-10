const Router = require("koa-router")
const { login } = require("../controller/auth.controller")
const { verifyLogin } = require("../middleware/auth.middleware")

const router = new Router({prefix: "/login"})

router.post("/:accountKey", verifyLogin, login)

module.exports = router