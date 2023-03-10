const Router = require("koa-router")
const { getMenus } = require("../controller/menu.controller")
const { verifyAuth } = require("../middleware/auth.middleware")
const { verifyMenu } = require("../middleware/menu.middleware")

const router = new Router({prefix: "/menu"})

router.get("/:accountKey", verifyAuth, verifyMenu, getMenus)

module.exports = router