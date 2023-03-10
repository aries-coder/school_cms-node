const accountMenus = require("../constants/menus");
class MenuController {
  async getMenus(ctx) {
    const { accountKey } = ctx.params;
    let res;
    switch (accountKey) {
      case "student":
        res = accountMenus.studentMenu;
        break;
      case "teacher":
        res = accountMenus.teacherMenu;
        break;
      case "admin":
        res = accountMenus.adminMenu
      default:
        break;
    }

    ctx.body = res;
  }
}

module.exports = new MenuController();
