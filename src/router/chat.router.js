const Router = require("koa-router")
const { create, getList, getChat } = require("../controller/chat.controller")
const { verifyAuth, verifyAccount } = require("../middleware/auth.middleware")
const router = new Router({prefix: "/chat"})

router.post("/", verifyAuth, verifyAccount, create)
router.post("/list", verifyAuth, verifyAccount, getList)
router.post("/:id", verifyAuth, verifyAccount, getChat)

module.exports = router