const usersService = require("../service/users.service")
const authService = require("../service/auth.service")
class UsersController {
  async update(ctx) {
    const { accountKey, id } = ctx.params
    const { account } = ctx.user
    await usersService.updateByAccountId(ctx.request.body, account, accountKey, id)

    ctx.body = "修改成功"
  }

  async get(ctx) {
    const { accountKey, id } = ctx.params
    const { account } = ctx.user

    const res = await usersService.findByAccountId(account, parseInt(id), accountKey)
  
    delete res.createdAt
    delete res.updatedAt

    ctx.body = res
  }
}

module.exports = new UsersController()