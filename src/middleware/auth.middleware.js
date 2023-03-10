const {
  ACCOUNT_IS_NOT_EXISTS,
  ACCOUNT_OR_PASSWORD_IS_REQUEIRED,
  ACCOUNT_PASSWORD_IS_ERROR,
  UNAUTHORIZATION,
} = require("../constants/error-types");
const authService = require("../service/auth.service");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");
const usersService = require("../service/users.service");

const verifyLogin = async (ctx, next) => {
  const { account, password } = ctx.request.body;
  const { accountKey } = ctx.params;
  

  // 账号或密码是否为空
  if (!account || !password) {
    const error = new Error(ACCOUNT_OR_PASSWORD_IS_REQUEIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 验证数据库中是否存在该用户
  const res = await authService.findByAccountId(account, accountKey);
  if (!res) {
    const error = new Error(ACCOUNT_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 验证密码是否正确
  if (!(res.password === password)) {
    const error = new Error(ACCOUNT_PASSWORD_IS_ERROR);
    return ctx.app.emit("error", error, ctx);
  }

  // 验证通过
  ctx.user = {
    id: res.id,
    account,
    accountKey,
  };
  await next();
};

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = res;
    await next();
  } catch (error) {
    const err = new Error(UNAUTHORIZATION);
    return ctx.app.emit("error", err, ctx);
  }
};

const verifyAccount = async (ctx, next) => {
  const { id, account, accountKey } = ctx.user;

  const res = await usersService.findByAccountId(account, id, accountKey);
  if (!res) {
    const error = new Error(ACCOUNT_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

const verifyAdmin = async (ctx, next) => {
  const { id, account } = ctx.user
  const res = await usersService.findByAccountId(account, id, "admin");
  if (!res) {
    const error = new Error(ACCOUNT_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
}



module.exports = {
  verifyLogin,
  verifyAuth,
  verifyAccount,
  verifyAdmin
};
