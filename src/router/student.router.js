const Router = require("koa-router");
const {
  getCourse,
  getCurrentCourse,
  saveSelectCourse,
  removeSelectCourse,
} = require("../controller/student.controller");
const { verifyAuth, verifyAccount } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/student" });

router.post("/course/list", verifyAuth, verifyAccount, getCourse);
router.get("/course/list", verifyAuth, verifyAccount, getCurrentCourse);
router.post("/course", verifyAuth, verifyAccount, saveSelectCourse);
router.delete("/course/:removeId", verifyAuth, verifyAccount, removeSelectCourse);

module.exports = router;
