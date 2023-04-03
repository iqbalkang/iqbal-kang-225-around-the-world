const db = require('../utils/connectDB')

class Alert {
  constructor(alertFor, alertFrom, type, text, commentId, placeId) {
    this.alertFor = alertFor
    this.alertFrom = alertFrom
    this.text = text
    this.type = type
    this.commentId = commentId
    this.placeId = placeId
  }

  async save() {
    const dbQuery = `INSERT INTO alerts (alert_for, alert_from, type)
                   VALUES ($1,$2,$3) RETURNING *`
    const values = [this.alertFor, this.alertFrom, this.type]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static async findByUserId(userId) {
    const dbQuery = `SELECT alerts.*, users.* FROM alerts
                     JOIN users ON alerts.alert_from = users.id
                     WHERE alert_for = ${userId};`

    const data = await db.query(dbQuery)
    return data.rows
  }

  // static async findOne(alertFor, alertFrom) {
  //   const dbQuery = `SELECT * FROM followers
  //                    WHERE following_id = ${alertFor} AND follower_id = ${alertFrom};`

  //   const data = await db.query(dbQuery)
  //   return data.rows[0]
  // }

  // static async findByIdAndDelete(alertFor, alertFrom) {
  //   const dbQuery = `DELETE FROM followers
  //                    WHERE following_id = ${alertFor} AND follower_id = ${alertFrom};`

  //   const data = await db.query(dbQuery)
  //   return data.rows[0]
  // }

  // static async findByIdsAndUpdate(alertFor, alertFrom, text) {
  //   const dbQuery = `UPDATE followers
  //                    SET text = '${text}'
  //                    WHERE following_id = ${alertFrom} AND follower_id = ${alertFor};`

  //   const data = await db.query(dbQuery)
  //   return data.rows[0]
  // }
}

module.exports = Alert
