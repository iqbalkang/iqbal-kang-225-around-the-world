const db = require('../utils/connectDB')

class Reaction {
  constructor(type, commentId, userId) {
    this.type = type
    this.commentId = commentId
    this.userId = userId
  }

  async save() {
    const dbQuery = `INSERT INTO reactions (type, comment_id, user_id)
                   VALUES ($1,$2,$3) RETURNING *`
    const values = [this.type, this.commentId, this.userId]

    const data = await db.query(dbQuery, values)
    return data.rows
  }

  static async findOne(userId, commentId) {
    const dbQuery = `SELECT * FROM reactions
                     WHERE user_id = ${userId} AND comment_id = ${commentId}`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findByIdAndDelete(userId, commentId) {
    const dbQuery = `DELETE FROM reactions
                     WHERE user_id = ${userId} AND comment_id = ${commentId}`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }
}

module.exports = Reaction
