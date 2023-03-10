const dotenv = require("dotenv");
const fs = require("fs")
const { PRIVATE_KEY: private_key, PUBLIC_KEY: public_key } = require("../constants/path")

dotenv.config();

const PUBLIC_KEY = fs.readFileSync(public_key)
const PRIVATE_KEY = fs.readFileSync(private_key)

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.PUBLIC_KEY = PUBLIC_KEY
module.exports.PRIVATE_KEY = PRIVATE_KEY
