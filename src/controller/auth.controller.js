const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../app/config")

class AuthController {
  async login(ctx) {
    
    const { id, account, accountKey } = ctx.user

    const token = jwt.sign({id, account, accountKey}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 10,
      algorithm: "RS256"
    })
    

    
    ctx.body = {
      id,
      token
    }
  }
}

module.exports = new AuthController()