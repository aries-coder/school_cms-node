const authService = require("../service/auth.service");
const { ACCOUNT_IS_NOT_EXISTS } = require("../constants/error-types");

const verifyMenu = async (ctx, next) => {
  const { account } = ctx.user;
  const { accountKey } = ctx.params;

  // 判断该用户是否在数据库中存在
  const res = await authService.findByAccountId(account, accountKey);
  if (!res) {
    const error = new Error(ACCOUNT_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = {
  verifyMenu,
};
