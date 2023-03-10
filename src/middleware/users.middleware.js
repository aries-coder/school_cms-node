const authService = require("../service/auth.service");
const {
  NO_OPERATION_PERMISSION,
  ACCOUNT_IS_NOT_EXISTS,
} = require("../constants/error-types");

const verifyUsers = async (ctx, next) => {
  const { accountKey, id } = ctx.params;
  const { account, id: currentId } = ctx.user;
  
  // 判断修改的用户id是否和当前用户的id一致
  if (!(id == currentId)) {
    const error = new Error(NO_OPERATION_PERMISSION);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断数据库中是否存在当前用户
  const res = await authService.findByAccountId(account, accountKey);
  if (!res) {
    const error = new Error(ACCOUNT_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next()
};

module.exports = {
  verifyUsers,
};
