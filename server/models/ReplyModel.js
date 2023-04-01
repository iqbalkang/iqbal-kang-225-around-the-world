const db = require('../utils/connectDB')

class Reply {
  constructor(reply, commentId, userId) {
    this.reply = reply
    this.userId = userId
    this.commentId = commentId
  }

  async save() {
    const dbQuery = `INSERT INTO replies (reply, comment_id, user_id)
                   VALUES ($1,$2, $3) RETURNING *`
    const values = [this.reply, this.commentId, this.userId]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  // static async findByPlaceId(commentId) {
  //   const dbQuery = `SELECT reply, users.id as user_id, first_name, last_name, image
  //                    FROM comments
  //                    JOIN users ON comments.user_id = users.id
  //                    WHERE place_id = ${commentId}`

  //   const data = await db.query(dbQuery)
  //   return data.rows
  // }

  // static async findByPlaceAndUserId(commentId, userId) {
  //   const dbQuery = `SELECT reply, comments.id, users.id as user_id, first_name, last_name, image, type as reaction
  //                    FROM comments
  //                    JOIN users ON comments.user_id = users.id
  //                    LEFT JOIN reactions ON reactions.user_id = ${userId} AND reactions.comment_id = comments.id
  //                    WHERE place_id = ${commentId}`

  //   const data = await db.query(dbQuery)
  //   return data.rows
  // }
}

module.exports = Reply
