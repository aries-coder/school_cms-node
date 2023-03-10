const courseService = require("../service/course.service")

class StudentController {
  async getCourse(ctx) {
    const res = await courseService.getCourseByRequestInfo(ctx.request.body)

    ctx.body = res
  }

  async getCurrentCourse(ctx) {
    const {id, account} = ctx.user
    const res = await courseService.getStudentCurrentCourseByStuId(id)
    ctx.body = res
  }

  async saveSelectCourse(ctx) {
    const { id: stu_id } = ctx.user

    const res = await courseService.getStudentCurrentCourseByStuId(stu_id)
    for (const item of res) {
      if (item.course_id == ctx.request.body.course_id) {
        return ctx.body = '已选择该课程'
      }
    }

    const res2 = await courseService.saveStudentSelectCourse({...ctx.request.body, stu_id})
    if (!res2.affectedRows) {
      return ctx.body = '当前课程不存在'
    }
    ctx.body = '选课成功'
  }

  async removeSelectCourse(ctx) {

    const { removeId } = ctx.params
    const { id } = ctx.user

    const res = await courseService.removeStudentSelectCourse(removeId, id)
    if (!res.affectedRows) {
      return ctx.body = '当前课程不存在'
    }

    ctx.body = '退课成功'
  }
}

module.exports = new StudentController()