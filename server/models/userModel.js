const db = require('../utils/connectDB')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class User {
  constructor(firstName, lastName, email, password, aboutMe, image, imageId) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.aboutMe = aboutMe
    this.image = image
    this.imageId = imageId
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12)

    const dbQuery = `INSERT INTO users (first_name, last_name, email, password)
                   VALUES ($1,$2,$3,$4) RETURNING *`
    const values = [this.firstName, this.lastName, this.email, hashedPassword]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static async findOne(email) {
    const dbQuery = `SELECT * FROM users
                     WHERE email = '${email}'`
    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findOneById(userId) {
    const dbQuery = `SELECT users.id, first_name, last_name, email, about_me,image FROM users
                     WHERE users.id = ${userId}`
    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findOneByIds(userId, signedInUserId) {
    const dbQuery = `SELECT users.id, first_name, last_name, email, about_me,image, status FROM users
                     LEFT JOIN followers ON following_id = ${userId} AND follower_id = ${signedInUserId}
                     WHERE users.id = ${userId}`
    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async getFollowers(userId) {
    const dbQuery = `SELECT count(*)::integer FROM followers
                     WHERE following_id = ${userId} AND status = 'accepted'`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async getFollowing(userId) {
    const dbQuery = `SELECT count(*)::integer FROM followers
                     WHERE follower_id = ${userId} AND status = 'accepted'`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  async updateOne(email) {
    this.aboutMe = this.aboutMe ? `'${this.aboutMe}'` : null
    this.image = this.image ? `'${this.image}'` : null
    this.imageId = this.imageId ? `'${this.imageId}'` : null

    const dbQuery = `UPDATE users SET
                      first_name = '${this.firstName}', 
                      last_name = '${this.lastName}', 
                      about_me = ${this.aboutMe},
                      image    = ${this.image},
                      image_id =  ${this.imageId}  
                      WHERE email = '${email}' RETURNING *`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findAllUsers() {
    const dbQuery = `SELECT users.id, first_name, last_name, users.image, about_me, count(places.user_id) AS total_places 
                     FROM users
                     LEFT JOIN places
                     ON places.user_id = users.id
                     GROUP BY users.id
                    `

    const data = await db.query(dbQuery)
    return data.rows
  }

  static createJWT(user) {
    const { id, email } = user
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
  }

  static async comparePasswords(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword)
  }
}

module.exports = User
