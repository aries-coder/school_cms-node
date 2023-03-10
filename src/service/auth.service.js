const connections = require("../databases")

class AuthService {
  async findByAccountId(account, accountKey) {
    let res
    let statement
    switch (accountKey) {
      case "student":
        statement = `SELECT * FROM student WHERE student_id = ?`
        const [studentResult] = await connections.execute(statement, [account])
        res = studentResult
        break;
      case "teacher":
        statement = `SELECT * FROM teacher WHERE job_id = ?`
        const [teacherResult] = await connections.execute(statement, [account])
        res = teacherResult
        break;
        case "admin":
          statement = `SELECT * FROM admin WHERE job_id = ?`
          const [adminResult] = await connections.execute(statement, [account])
          res = adminResult
          break;
      default:
        break;
    }
    return res[0]
  }
}

module.exports = new AuthService()