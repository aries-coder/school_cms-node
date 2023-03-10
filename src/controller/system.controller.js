const classService = require("../service/class.service");
const courseService = require("../service/course.service");
const usersService = require("../service/users.service");
const { formatCourseRequestBody } = require("../utils/formatRequestBody");
const { formatTimeStamp } = require("../utils/formatTime");

class SystemController {

  /**
   * course 操作
   */
  async getCourse(ctx) {
    const res = await courseService.getCourseByRequestInfo(ctx.request.body);

    ctx.body = res;
  }
  async removeCourse(ctx) {
    const { removeId } = ctx.params;

    const res = await courseService.removeCourseById(removeId);

    if (!res.affectedRows) {
      return (ctx.body = "当前课程不存在");
    }

    ctx.body = "删除成功";
  }
  async updateCourse(ctx) {
    const { patchId } = ctx.params;
    const newRequestBody = formatCourseRequestBody(ctx.request.body)

    const res = await courseService.updateCourseById(patchId, newRequestBody);
    if (!res.affectedRows) {
      return (ctx.body = "该课程不存在");
    }
    ctx.body = "修改成功";
  }
  async createCourse(ctx) {
    const newRequestBody = formatCourseRequestBody(ctx.request.body)
    const res = await courseService.createCourseByRequestInfo(newRequestBody)
    
    ctx.body = '添加课程成功'
  }


  /**
   * teacher 操作
   */
  async getTeacher(ctx) {
    const res = await usersService.getTeacherByRequestInfo(ctx.request.body);

    ctx.body = res;
  }
  async updateTeacher(ctx) {
    const { patchId } = ctx.params
    const res = await usersService.updateTeacherById(patchId, ctx.request.body)

    if (!res.affectedRows) {
      return (ctx.body = "该用户不存在");
    }
    ctx.body = "修改成功";
  }

  async createTeacher(ctx) {
    const res = await usersService.createTeacherByRequestInfo(ctx.request.body)

    if (!res.affectedRows) {
      return (ctx.body = "创建失败");
    }
    ctx.body = "创建成功";
  }
  async removeTeacher(ctx) {
    const { id } = ctx.params

    const courseRes = await courseService.getCourseByRequestInfo({teacher_id: id})
    if (courseRes.length) {
      return ctx.body = '该老师有授课的课程，无法删除'
    }

    const removeRes = await usersService.removeTeacherById(id)
    if (!removeRes.affectedRows) {
      return (ctx.body = "删除失败");
    }
    ctx.body = "删除成功";
  }

  /**
   * student 操作
   */
  async getStudent(ctx) {
    const res = await usersService.getStudentByRequestInfo(ctx.request.body)
    
    ctx.body = res
  }
  async updateStudent(ctx) {
    const { patchId } = ctx.params
    let updateInfo = ctx.request.body
    updateInfo = {...updateInfo, admission_date: formatTimeStamp(updateInfo.date[0]), graduation_date: formatTimeStamp(updateInfo.date[1])}
    delete updateInfo.date
    
    const res = await usersService.updateStudentById(parseInt(patchId), updateInfo)
    
    if (!res.affectedRows) {
      return (ctx.body = "编辑失败");
    }
    ctx.body = "编辑成功";
  }
  async createStudent(ctx) {
    let createInfo = ctx.request.body
    createInfo = {...createInfo, admission_date: formatTimeStamp(createInfo.date[0]), graduation_date: formatTimeStamp(createInfo.date[1])}
    delete createInfo.date

    const res = await usersService.createStudentByCreateInfo(createInfo)

    if (!res.affectedRows) {
      return (ctx.body = "创建失败");
    }
    ctx.body = "创建成功";
  }
  async removeStudent(ctx) {
    const { id } = ctx.params
    const res = await usersService.removeStudentById(id)

    if (!res.affectedRows) {
      return (ctx.body = "删除失败");
    }
    ctx.body = "删除成功";
  }


  async getClass(ctx) {
    const res = await classService.getClassByRequestInfo(ctx.request.body)
    
    ctx.body = res
  }

  async getDepartment(ctx) {
    const res = await usersService.getDepartmentByRequestInfo(ctx.request.body);

    ctx.body = res;
  }
}

module.exports = new SystemController();
