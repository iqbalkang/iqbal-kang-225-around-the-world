const db = require('../utils/connectDB')

class Like {
  constructor(userId, placeId) {
    this.userId = userId
    this.placeId = placeId
  }

  async save() {
    const dbQuery = `INSERT INTO likes (user_id, place_id)
                   VALUES ($1,$2) RETURNING *`
    const values = [this.userId, this.placeId]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static async find() {
    const dbQuery = `SELECT * FROM likes`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findOne(userId, placeId) {
    const dbQuery = `SELECT * FROM likes 
                     WHERE user_id = '${userId}' AND place_id = '${placeId}'`
    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findByIdAndDelete(userId, placeId) {
    const dbQuery = `DELETE FROM likes 
                     WHERE user_id = '${userId}' AND place_id = '${placeId}'`
    const data = await db.query(dbQuery)
    return data.rows[0]
  }
}

module.exports = Like
