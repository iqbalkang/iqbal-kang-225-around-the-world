const db = require('../utils/connectDB')

class Follow {
  constructor(followingId, followerId, status) {
    this.followingId = followingId
    this.followerId = followerId
    this.status = status
  }

  async save() {
    const dbQuery = `INSERT INTO followers (following_id, follower_id, status)
                   VALUES ($1,$2,$3) RETURNING *`
    const values = [this.followingId, this.followerId, this.status]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static async findOne(followingId, followerId) {
    const dbQuery = `SELECT * FROM followers
                     WHERE following_id = ${followingId} AND follower_id = ${followerId};`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findByIdsAndDelete(followingId, followerId) {
    const dbQuery = `DELETE FROM followers
                     WHERE following_id = ${followingId} AND follower_id = ${followerId};`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findByIdsAndUpdate(followingId, followerId, status) {
    console.log(status)
    const dbQuery = `UPDATE followers
                     SET status = '${status}'
                     WHERE following_id = ${followingId} AND follower_id = ${followerId};`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }
}

module.exports = Follow
