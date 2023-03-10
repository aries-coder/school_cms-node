const {
  ACCOUNT_IS_NOT_EXISTS,
  ACCOUNT_OR_PASSWORD_IS_REQUEIRED,
  ACCOUNT_PASSWORD_IS_ERROR,
  UNAUTHORIZATION,
  PARAMS_IS_NOT_DEFINED,
  NO_OPERATION_PERMISSION
} = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case ACCOUNT_OR_PASSWORD_IS_REQUEIRED:
      status = 401;
      message = "账号或密码不能为空";
      break;
    case ACCOUNT_IS_NOT_EXISTS:
      status = 401;
      message = "该用户不存在";
      break;
    case ACCOUNT_PASSWORD_IS_ERROR:
      status = 401;
      message = "密码错误";
      break;
    case UNAUTHORIZATION:
      status = 401;
      message = "无效的token";
      break;
    case PARAMS_IS_NOT_DEFINED:
      status = 401;
      message = "参数不能为空";
      break;
    case NO_OPERATION_PERMISSION:
      status = 401;
      message = "您没有操作的权限"
    default:
      break;
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
