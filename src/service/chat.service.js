const connections = require("../databases")

class ChatService {
  async create(author, title, content) {
    const statement = `INSERT INTO chat (author, title, content) VALUES (?, ?, ?)`
    const [res] = await connections.execute(statement, [author, title, content])
    
    return res
  }

  async findChatList() {
    const statement = `SELECT * FROM chat ORDER BY id DESC`
    const [res] = await connections.execute(statement, [])

    return res
  }

  async findChatById(id) {
    const statement = `SELECT * FROM chat WHERE id = ?`
    const [res] = await connections.execute(statement, [id])

    return res[0]
  }
}

module.exports = new ChatService()