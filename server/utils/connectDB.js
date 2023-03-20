const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DB,
})

module.exports = pool
