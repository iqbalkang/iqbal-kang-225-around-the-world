const db = require('../utils/connectDB')

class Comment {
  constructor(comment, placeId, userId) {
    this.comment = comment
    this.userId = userId
    this.placeId = placeId
  }

  async save() {
    const dbQuery = `INSERT INTO comments (comment, place_id, user_id)
                   VALUES ($1,$2, $3) RETURNING *`
    const values = [this.comment, this.placeId, this.userId]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static async findByPlaceId(placeId) {
    const dbQuery = `SELECT comment, users.id as user_id, first_name, last_name, image
                     FROM comments
                     JOIN users ON comments.user_id = users.id
                     WHERE place_id = ${placeId}`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findByPlaceAndUserId(placeId, userId) {
    const dbQuery = `SELECT comment, comments.id, users.id as user_id, first_name, last_name, image, type as reaction
                     FROM comments
                     JOIN users ON comments.user_id = users.id
                     LEFT JOIN reactions ON reactions.user_id = ${userId} AND reactions.comment_id = comments.id
                     WHERE place_id = ${placeId}`

    const data = await db.query(dbQuery)
    return data.rows
  }
}

module.exports = Comment
