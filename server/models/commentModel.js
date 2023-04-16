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
    const dbQuery = `SELECT comment,comments.id, users.id as user_id, comments.created_at, first_name, last_name, image, 
                    (SELECT COUNT(*) from reactions WHERE reactions.comment_id = comments.id) AS likes_count,
                     COUNT(reply)::integer AS reply_count
                     FROM comments
                     JOIN users ON comments.user_id = users.id
                     LEFT JOIN replies ON replies.comment_id = comments.id
                     WHERE place_id = ${placeId}
                     GROUP BY comment, comments.id, users.id, first_name, last_name, image`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findByPlaceAndUserId(placeId, userId) {
    const dbQuery = `SELECT comment, comments.id, users.id as user_id, comments.created_at, first_name, last_name, image, 
                     (SELECT COUNT(*)::integer from reactions WHERE reactions.comment_id = comments.id) AS likes_count,
                     COUNT(reply)::integer as reply_count, type AS reaction
                     FROM comments
                     JOIN users ON comments.user_id = users.id
                     LEFT JOIN replies ON replies.comment_id = comments.id
                     LEFT JOIN reactions ON reactions.user_id = ${userId} AND reactions.comment_id = comments.id
                     WHERE place_id = ${placeId}
                     GROUP BY comment, comments.id, users.id, first_name, last_name, image, type`
    // const dbQuery = `SELECT comment, comments.id, users.id as user_id, first_name, last_name, image, type as reaction
    //                  FROM comments
    //                  JOIN users ON comments.user_id = users.id
    //                  LEFT JOIN reactions ON reactions.user_id = ${userId} AND reactions.comment_id = comments.id
    //                  WHERE place_id = ${placeId}`

    const data = await db.query(dbQuery)
    return data.rows
  }
}

module.exports = Comment
