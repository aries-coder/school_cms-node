const mysql2 = require("mysql2")

const formatUpdateSql = (sql, arr) => {
  arr.forEach((item, index) => {
    sql += item + " = " + "?, ";
    if (index == arr.length - 1) {
      sql = `${sql.slice(0, sql.length - 2)}`
    }
  });

  return sql
};

const formatSelectSql  =(sql, param, keys, values) => {
  keys.forEach((item, index) => {
    sql += `${param}${item} LIKE "%${values[index]}%" AND `
    if (index === keys.length - 1) {
      sql = `${sql.slice(0, sql.length - 5)}`
    }
  })
  return sql
}

module.exports = {
  formatUpdateSql,
  formatSelectSql
}