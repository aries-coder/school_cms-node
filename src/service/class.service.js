const { formatSelectSql } = require("../utils/formatSql");
const connections = require("../databases");

class ClassService {
  async getClassByRequestInfo(requestInfo) {
    const keys = [];
    Object.keys(requestInfo).forEach((item) => {
      if (!requestInfo[item]) {
        delete requestInfo[item];
      } else {
        keys.push(item);
      }
    });
    const values = Object.values(requestInfo)

    const statement = keys.length ? formatSelectSql(`SELECT * FROM class WHERE `, ``, keys, values) : `SELECT * FROM class`

    const [res] = await connections.execute(statement, [...values])
    return res
  }
}

module.exports = new ClassService()