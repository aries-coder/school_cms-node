const Router = require("koa-router");
const {
  getCourse,
  removeCourse,
  updateCourse,
  getTeacher,
  getDepartment,
  createCourse,
  updateTeacher,
  createTeacher,
  removeTeacher,
  getStudent,
  getClass,
  updateStudent,
  createStudent,
  removeStudent
} = require("../controller/system.controller");
const { verifyAuth, verifyAccount, verifyAdmin } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/admin" });

// course
router.post("/course/list", verifyAuth, verifyAccount, getCourse);
router.delete("/course/:removeId", verifyAuth, verifyAccount, verifyAdmin, removeCourse);
router.patch("/course/:patchId", verifyAuth, verifyAccount, verifyAdmin, updateCourse)
router.post("/course", verifyAuth, verifyAccount, verifyAdmin, createCourse)

// teacher
router.post("/teacher/list", verifyAuth, verifyAccount, getTeacher);
router.post("/department/list", verifyAuth, verifyAccount, getDepartment);
router.patch("/teacher/:patchId", verifyAuth, verifyAccount, verifyAdmin, updateTeacher)
router.post("/teacher", verifyAuth, verifyAccount, verifyAdmin, createTeacher)
router.delete("/teacher/:id", verifyAuth, verifyAccount, verifyAdmin, removeTeacher)

// student
router.post('/student/list', verifyAuth, verifyAccount, verifyAdmin, getStudent)
router.patch('/student/:patchId', verifyAuth, verifyAccount, verifyAdmin, updateStudent)
router.post('/student', verifyAuth, verifyAccount, verifyAdmin, createStudent)
router.delete('/student/:id', verifyAuth, verifyAccount, removeStudent)

// class
router.post('/class/list', verifyAuth, verifyAccount, verifyAdmin, getClass)

module.exports = router;
