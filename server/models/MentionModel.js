const db = require('../utils/connectDB')

class Mention {
  constructor(mentioned, mentionedBy, commentId) {
    this.mentioned = mentioned
    this.mentionedBy = mentionedBy
    this.commentId = commentId
  }

  async save() {
    const dbQuery = `INSERT INTO mentions (mentioned, mentioned_by, comment_id )
                   VALUES ($1,$2,$3) RETURNING *`
    const values = [this.mentioned, this.mentionedBy, this.commentId]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static async findByCommentId(commentId) {
    const dbQuery = `SELECT users.first_name, users.last_name, users.id, comment_id FROM mentions
                    LEFT JOIN users ON users.id = mentioned
                     WHERE comment_id = ${commentId}                    
                    `

    const data = await db.query(dbQuery)
    return data.rows
  }
}

module.exports = Mention
