const Router = require("koa-router")
const { verifyAuth, verifyAccount } = require("../middleware/auth.middleware")
const { getCourse, getAllCourse, getTeachingCourse } = require("../controller/teacher.controller")

const router = new Router({prefix: "/teacher"})

router.post('/course/list', verifyAuth, verifyAccount, getAllCourse)
router.get("/course/list", verifyAuth, verifyAccount, getTeachingCourse);

module.exports = router