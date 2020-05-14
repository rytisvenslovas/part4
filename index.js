const app = require('./app')
const http = require('http')
const config = require('./utils/config')


const server = http.createServer(app)


server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT} and connecting to ${config.MONGODB_URI}`)
})