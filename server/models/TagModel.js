const db = require('../utils/connectDB')

class Tag {
  constructor(tag, placeId) {
    this.tag = tag
    this.placeId = placeId
  }

  async save() {
    const dbQuery = `INSERT INTO tags (tag, place_id)
                   VALUES ($1,$2) RETURNING *`
    const values = [this.tag, this.placeId]

    const data = await db.query(dbQuery, values)
    return data.rows
  }

  static async findByIdAndDelete(placeId) {
    const dbQuery = `DELETE FROM tags WHERE tags.place_id = ${placeId}`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }
}

module.exports = Tag
