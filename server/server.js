require('dotenv').config()

const httpServer = require('./app')

const PORT = process.env.port || 8000

httpServer.listen(PORT, () => console.log(`Listening on ${PORT}...`))
