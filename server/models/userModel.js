const db = require('../utils/connectDB')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class User {
  constructor(firstName, lastName, email, password, about, image, createdAt) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.about = about
    this.image = image
    this.createdAt = createdAt
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12)

    const dbQuery = `INSERT INTO users (first_name, last_name, email, password)
                   VALUES ($1,$2,$3,$4) RETURNING *`
    const values = [this.firstName, this.lastName, this.email, hashedPassword]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static createJWT(user) {
    const { id, email } = user
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
  }

  static async findOne(email) {
    const dbQuery = `SELECT * FROM users
                     WHERE email = '${email}'`
    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async comparePasswords(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword)
  }
}

module.exports = User
