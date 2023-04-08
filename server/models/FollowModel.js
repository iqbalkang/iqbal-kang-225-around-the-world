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

  static async getFollowers(userId) {
    const dbQuery = `SELECT u1.first_name, u1.last_name, u1.image, u1.id
                     FROM followers f
                     JOIN users u1 ON u1.id = f.follower_id
                     WHERE f.following_id = ${userId} AND status = 'accepted'`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async getFollowing(userId) {
    const dbQuery = `SELECT u1.first_name, u1.last_name, u1.image, u1.id
                     FROM followers f
                     JOIN users u1 ON u1.id = f.following_id
                     WHERE f.follower_id = ${userId} AND status = 'accepted'`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async getFollowersForSignedInUsers(userId, signedInuserId) {
    const dbQuery = `SELECT u1.first_name, u1.last_name, u1.image, u1.id,
                     CASE 
                         WHEN
                             f.follower_id IN (
                                 SELECT following_id
                                 FROM followers
                                 WHERE follower_id = ${signedInuserId} AND status = 'accepted'
                             )
                         THEN 'accepted'
                         WHEN
                             f.follower_id IN (
                                 SELECT following_id
                                 FROM followers
                                 WHERE follower_id = ${signedInuserId} AND status = 'pending'
                             )
                         THEN 'pending'
                         ELSE 'rejected'
                     END AS status
                     FROM followers f
                     JOIN users u1 ON u1.id = f.follower_id
                     WHERE f.following_id = ${userId} AND status = 'accepted'`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async getFollowingForSignedInUsers(userId, signedInuserId) {
    const dbQuery = `SELECT u1.first_name, u1.last_name, u1.image, u1.id,
                     CASE
                     WHEN
                       f.following_id IN (
                           SELECT following_id
                           FROM followers
                           WHERE follower_id = ${signedInuserId} AND status = 'accepted'
                       )
                     THEN 'accepted'
                     WHEN
                       f.following_id IN (
                           SELECT following_id
                           FROM followers
                           WHERE follower_id = ${signedInuserId} AND status = 'pending'
                       )
                     THEN 'pending'
                     ELSE 'rejected'
                     END AS status
                     FROM followers f
                     JOIN users u1 ON u1.id = f.following_id
                     WHERE f.follower_id = ${userId} AND status = 'accepted'`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findByIdsAndDelete(followingId, followerId) {
    const dbQuery = `DELETE FROM followers
                     WHERE following_id = ${followingId} AND follower_id = ${followerId}`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findByIdsAndUpdate(followingId, followerId, status) {
    const dbQuery = `UPDATE followers
                     SET status = '${status}'
                     WHERE following_id = ${followingId} AND follower_id = ${followerId};`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }
}

module.exports = Follow
