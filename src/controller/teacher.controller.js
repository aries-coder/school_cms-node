const courseService = require("../service/course.service")

class TeacherController {
  async getAllCourse(ctx) {

    const res = await courseService.getCourseByRequestInfo(ctx.request.body)
    ctx.body = res
  }

  async getTeachingCourse(ctx) {
    const { id } = ctx.user
    const res = await courseService.getTeachingCurrentCourseByInfo(id)
    
    ctx.body = res
  }
}

module.exports = new TeacherController()