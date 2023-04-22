const db = require('../utils/connectDB')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class User {
  constructor(firstName, lastName, email, password, aboutMe, isPublic, image, imageId) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.aboutMe = aboutMe
    this.isPublic = isPublic
    this.image = image
    this.imageId = imageId
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12)

    const dbQuery = `INSERT INTO users (first_name, last_name, email, password)
                   VALUES ($1,$2,$3,$4) RETURNING *`
    const values = [this.firstName, this.lastName, this.email.toLowerCase(), hashedPassword]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static async findOne(email) {
    const dbQuery = `SELECT * FROM users
                     WHERE email = '${email.toLowerCase()}'`
    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findOneById(userId) {
    const dbQuery = `SELECT users.id, first_name, last_name, email, about_me,image, is_public,
                    (SELECT COUNT(following_id)::integer FROM followers WHERE following_id = ${userId} AND status = 'accepted') as followers,
                    (SELECT COUNT(follower_id)::integer FROM followers WHERE follower_id = ${userId} AND status = 'accepted') as following
                     FROM users
                     WHERE users.id = ${userId}`
    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findOneByIds(userId, signedInUserId) {
    const dbQuery = `SELECT users.id, first_name, last_name, email, about_me,image, is_public,
                     CASE 
                     WHEN followers.status = 'accepted' THEN true
                     ELSE false
                     END AS is_followed_by_current_user,
                     (SELECT COUNT(following_id)::integer FROM followers WHERE following_id = ${userId} AND status = 'accepted') as followers,
                     (SELECT COUNT(follower_id)::integer FROM followers WHERE follower_id = ${userId} AND status = 'accepted') as following,
                     (SELECT COUNT(*)::integer FROM places WHERE places.user_id = ${userId}) as places,
                     status FROM users
                     LEFT JOIN followers ON following_id = ${userId} AND follower_id = ${signedInUserId}
                     WHERE users.id = ${userId}`
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
                      is_public = ${this.isPublic},
                      image    = ${this.image},
                      image_id =  ${this.imageId}  
                      WHERE email = '${email}' RETURNING *`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findAllUsers(skip, limit) {
    const dbQuery = `SELECT users.id, first_name, last_name, users.image, about_me, count(places.user_id) AS total_places 
                     FROM users
                     LEFT JOIN places
                     ON places.user_id = users.id
                     GROUP BY users.id
                     OFFSET ${skip} LIMIT ${limit}
                    `

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async searchUser(name) {
    const dbQuery = `SELECT users.id, first_name, last_name, users.image 
                     FROM users
                     WHERE first_name LIKE '${name}%'
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
