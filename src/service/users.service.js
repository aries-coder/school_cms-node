const connections = require("../databases");
const { formatUpdateSql, formatSelectSql } = require("../utils/formatSql");

class UsersService {
  async updateByAccountId(updateUserInfo, account, accountKey, id) {
    let res;
    let statement;
    const keys = Object.keys(updateUserInfo);
    Object.keys(updateUserInfo).forEach(
      (item) =>
        !updateUserInfo[item] &&
        delete updateUserInfo[item] &&
        delete keys[item]
    );
    const values = Object.values(updateUserInfo);

    switch (accountKey) {
      case "student":
        statement =
          formatUpdateSql(`UPDATE student set `, keys) +
          ` WHERE id = ? AND student_id = ?`;
        const [updateStudentResult] = await connections.execute(statement, [
          ...values,
          id,
          account,
        ]);

        res = updateStudentResult;
        break;
      case "teacher":
        statement =
          formatUpdateSql(`UPDATE teacher set `, keys) +
          ` WHERE id = ? AND job_id = ?`;
        const [updateTeacherResult] = await connections.execute(statement, [
          ...values,
          id,
          account,
        ]);

        res = updateTeacherResult;
        break;
      case "admin":
        statement =
          formatUpdateSql(`UPDATE admin set `, keys) +
          ` WHERE id = ? AND job_id = ?`;
        const [updateAdminResult] = await connections.execute(statement, [
          ...values,
          id,
          account,
        ]);

        res = updateAdminResult;
        break;
      default:
        break;
    }
    return res;
  }

  async findByAccountId(account, id, accountKey) {
    let res;
    let statement;
    switch (accountKey) {
      case "student":
        statement = `SELECT * FROM student WHERE id = ? AND student_id = ?`;
        const [studentResult] = await connections.execute(statement, [
          id,
          account,
        ]);
        res = studentResult;
        break;
      case "teacher":
        statement = `SELECT * FROM teacher WHERE id = ? AND job_id = ?`;
        const [teacherResult] = await connections.execute(statement, [
          id,
          account,
        ]);
        res = teacherResult;
        break;
      case "admin":
        statement = `SELECT * FROM admin WHERE id = ? AND job_id = ?`;
        const [adminResult] = await connections.execute(statement, [
          id,
          account,
        ]);
        res = adminResult;
        break;
      default:
        break;
    }

    return res[0];
  }

  // 管理员操作
  async getTeacherByRequestInfo(requestInfo) {
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

    const statement = values.length
      ? formatSelectSql(`SELECT * FROM teacher WHERE `, ``, keys, values) +
        `ORDER BY id DESC`
      : `SELECT * FROM teacher ORDER BY id DESC`;

    const [res] = await connections.execute(statement, [...values]);

    return res;
  }

  async getDepartmentByRequestInfo(requestInfo) {
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
    const statement = values.length
      ? formatSelectSql(`SELECT * FROM department WHERE `, ``, keys, values)
      : `SELECT * FROM department`;
    const [res] = await connections.execute(statement, [...values]);

    return res;
  }

  async updateTeacherById(id, updateInfo) {
    const keys = [];
    Object.keys(updateInfo).forEach((item) => {
      if (!updateInfo[item]) {
        delete updateInfo[item];
      } else {
        keys.push(item);
      }
    });
    const values = Object.values(updateInfo);

    const statement =
      formatUpdateSql(`UPDATE teacher SET `, keys) + ` WHERE id = ?`;
    const [res] = await connections.execute(statement, [...values, id]);

    return res;
  }

  async createTeacherByRequestInfo(requestInfo) {
    const statement = formatUpdateSql(
      `INSERT INTO teacher SET `,
      Object.keys(requestInfo)
    );

    const [res] = await connections.execute(statement, [
      ...Object.values(requestInfo),
    ]);
    return res;
  }

  async removeTeacherById(id) {
    const statement = `DELETE FROM teacher WHERE id = ?`;

    const [res] = await connections.execute(statement, [id]);
    return res;
  }

  async getStudentByRequestInfo(requestInfo) {
    const keys = [];
    Object.keys(requestInfo).forEach((item) => {
      if (!requestInfo[item]) {
        delete requestInfo[item];
      } else {
        keys.push(item);
      }
    });
    const values = Object.values(requestInfo);

    const statement = keys.length
      ? formatSelectSql(
          `SELECT stu.id id, stu.name name, stu.nation nation, stu.gender gender, stu.id_card id_card, stu.student_id, stu.cellphone cellphone, stu.status status, stu.grade grade, de.name department_name, class.name class_name, stu.admission_date admission_date, stu.graduation_date graduation_date, stu.address address, stu.createdAt createdAt, stu.updatedAt updatedAt FROM student stu LEFT JOIN department de ON stu.department_id = de.id LEFT JOIN class ON stu.class_id = class.id WHERE `,
          `stu.`,
          keys,
          values
        )
      : `SELECT stu.id id, stu.name name, stu.nation nation, stu.gender gender, stu.id_card id_card, stu.student_id, stu.cellphone cellphone, stu.status status, stu.grade grade, de.name department_name, class.name class_name, stu.admission_date admission_date, stu.graduation_date graduation_date, stu.address address, stu.createdAt createdAt, stu.updatedAt updatedAt FROM student stu LEFT JOIN department de ON stu.department_id = de.id LEFT JOIN class ON stu.class_id = class.id`;
    const [res] = await connections.execute(statement, [...values]);

    return res;
  }

  async updateStudentById(id, updateInfo) {
    const keys = [];
    Object.keys(updateInfo).forEach((item) => {
      if (!updateInfo[item]) {
        delete updateInfo[item];
      } else {
        keys.push(item);
      }
    });
    const values = Object.values(updateInfo);

    const statement =
      formatUpdateSql(`UPDATE student SET `, keys) + ` WHERE id = ?`;
    const [res] = await connections.execute(statement, [...values, id]);

    return res;
  }
  async createStudentByCreateInfo(createInfo) {
    const statement = formatUpdateSql(
      `INSERT INTO student SET `,
      Object.keys(createInfo)
    );
    const [res] = await connections.execute(statement, [
      ...Object.values(createInfo),
    ]);
    return res;
  }
  async removeStudentById(id) {
    const statement = `DELETE FROM student WHERE id = ?`;
    const [res] = await connections.execute(statement, [id]);

    return res;
  }
}

module.exports = new UsersService();
