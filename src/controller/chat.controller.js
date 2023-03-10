const chatService = require("../service/chat.service")

class ChatController {
  async create(ctx) {
    const { content, title } = ctx.request.body
    const { id, accountKey } = ctx.user

    if (content.length > 10000) {
      return ctx.body = "内容字数超出限制";
    }
    if (title.length < 1) {
      return ctx.body = "标题不能为空";
    }
    if (title.length > 10) {
      return ctx.body = "标题不能大于十个字符";
    }
    
    const res = await chatService.create(`${accountKey}_${id}`, title, content)

    if (!res.affectedRows) {
      return (ctx.body = "发布失败");
    }

    ctx.body = "发布成功";
  }

  async getList(ctx) {
    const res = await chatService.findChatList()

    ctx.body = res
  }

  async getChat(ctx) {
    const res = await chatService.findChatById(ctx.params.id)
    ctx.body = res
  }
}

module.exports = new ChatController()