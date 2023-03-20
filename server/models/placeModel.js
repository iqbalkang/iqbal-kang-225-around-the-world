const db = require('../utils/connectDB')

class Place {
  constructor(userId, address, country, lat, lng, title, description, rating, image, imageId) {
    this.userId = userId
    this.address = address
    this.country = country
    this.lat = lat
    this.lng = lng
    this.title = title
    this.description = description
    this.rating = rating
    this.image = image
    this.imageId = imageId
  }

  async save() {
    const dbQuery = `INSERT INTO places (user_id, address, country, lat, lng, title, description, rating, image, image_id)
                   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`
    const values = [
      this.userId,
      this.address,
      this.country,
      this.lat,
      this.lng,
      this.title,
      this.description,
      this.rating,
      this.image,
      this.imageId,
    ]

    const data = await db.query(dbQuery, values)
    return data.rows[0]
  }

  static async find() {
    const dbQuery = `SELECT * FROM places`

    const data = await db.query(dbQuery)
    return data.rows
  }
}

module.exports = Place
