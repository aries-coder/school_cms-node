const Router = require("koa-router")
const { update, get } = require("../controller/users.controller")
const { verifyAuth } = require("../middleware/auth.middleware")
const { verifyUsers } = require("../middleware/users.middleware")

const router = new Router({prefix: "/users"})

router.get("/:accountKey/:id", verifyAuth, get)
router.patch("/:accountKey/:id", verifyAuth, verifyUsers, update)

module.exports = router