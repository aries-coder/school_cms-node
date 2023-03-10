const connections = require("../databases");
const { formatSelectSql, formatUpdateSql } = require("../utils/formatSql");

class CourseService {
  async getCourseByRequestInfo(requestInfo) {
    const keys = [];
    Object.keys(requestInfo).forEach((item, index) => {
      if (!requestInfo[item]) {
        delete requestInfo[item];
        // delete keys[i]
      } else {
        keys.push(item);
      }
    });
    const values = Object.values(requestInfo);

    let statement = values.length
      ? formatSelectSql(
          `SELECT course.id id, course.name name, course.description description, course.start_time start_time, course.end_time end_time,course.credit credit, course.status status, course.teacher_id teacher_id, course.department_id department_id, teacher.name teacher_name, department.name department FROM course
    LEFT JOIN teacher ON course.teacher_id = teacher.id
    LEFT JOIN department ON course.department_id = department.id WHERE `,
          `course.`,
          keys,
          values
        )
      : `SELECT course.id id, course.name name, course.description description, course.start_time start_time, course.end_time end_time,course.credit credit, course.status status, course.teacher_id teacher_id, course.department_id department_id, teacher.name teacher_name, department.name department FROM course
    LEFT JOIN teacher ON course.teacher_id = teacher.id
    LEFT JOIN department ON course.department_id = department.id`;

    const [res] = await connections.execute(statement, [...values]);

    return res;
  }

  async getStudentCurrentCourseByStuId(id) {
    const statement = `SELECT stu_course.id id, course.id course_id, course.name name, course.start_time start_time, course.end_time end_time, course.description description, course.status status, course.credit credit, teacher.name teacher_name, department.name department, department.id department_id FROM stu_course 
    LEFT JOIN student ON stu_course.stu_id = student.id
    LEFT JOIN course ON stu_course.course_id = course.id
    LEFT JOIN teacher ON stu_course.teacher_id = teacher.id
    LEFT JOIN department ON stu_course.department_id = department.id
  WHERE stu_course.stu_id = ?`;

    const [res] = await connections.execute(statement, [id]);

    return res;
  }

  async getTeachingCurrentCourseByInfo(id) {
    const statement = `SELECT course.id id, course.name name,  COUNT(stu_course.course_id) stu_num, course.description description, course.start_time start_time, course.end_time end_time,course.credit credit, course.status status, course.teacher_id teacher_id, course.department_id department_id, teacher.name teacher_name, department.name department FROM course
		LEFT JOIN stu_course ON stu_course.course_id = course.id
    LEFT JOIN teacher ON course.teacher_id = teacher.id
    LEFT JOIN department ON course.department_id = department.id WHERE course.teacher_id = ? GROUP BY stu_course.course_id`;

    const [res] = await connections.execute(statement, [id]);

    return res;
  }

  async saveStudentSelectCourse(info) {
    const { stu_id, course_id, teacher_id, department_id } = info;

    const statement = `INSERT INTO stu_course (stu_id, course_id, teacher_id, department_id) VALUES (?, ?, ?, ?)`;

    const [res] = await connections.execute(statement, [
      stu_id,
      course_id,
      teacher_id,
      department_id,
    ]);

    return res;
  }

  async removeStudentSelectCourse(id, stu_id) {
    const statement = `DELETE FROM stu_course WHERE id = ? AND stu_id = ? `;
    const [res] = await connections.execute(statement, [id, stu_id]);

    return res;
  }

  async removeCourseById(id) {
    const statement = `DELETE FROM course WHERE id = ?`;
    const [res] = await connections.execute(statement, [id]);

    return res;
  }

  async updateCourseById(id, data) {
    const keys = Object.keys(data);
    Object.keys(data).forEach(
      (item) => !data[item] && delete data[item] && delete keys[item]
    );
    const values = Object.values(data);
    const statement =
      formatUpdateSql(`UPDATE course SET `, keys) + ` WHERE id = ?`;
    const [res] = await connections.execute(statement, [...values, id]);

    return res;
  }

  async createCourseByRequestInfo(requestInfo) {
    const keys = [];
    Object.keys(requestInfo).forEach((item, index) => {
      if (!requestInfo[item]) {
        delete requestInfo[item];
        // delete keys[i]
      } else {
        keys.push(item);
      }
    });
    const values = Object.values(requestInfo);
    const statement = formatUpdateSql(`INSERT INTO course set `, keys, values);
    const [res] = await connections.execute(statement, [...values]);

    return res;
  }
}

module.exports = new CourseService();
