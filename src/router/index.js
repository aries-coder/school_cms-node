const fs = require("fs")
const { INITIA_ROUTER } = require("../constants/path")

function initiaRoutes(app) {
  const files = fs.readdirSync(INITIA_ROUTER)
  files.forEach((file) => {
    if (file != "index.js") {
      const router = require(`./${file}`)
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  })
}

module.exports =  initiaRoutes