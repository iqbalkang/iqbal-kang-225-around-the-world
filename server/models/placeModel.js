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

  static async findByPlaceId(placeId) {
    const dbQuery = `SELECT places.*, COUNT(*) as likes
                     FROM places 
                     RIGHT JOIN likes
                     ON likes.place_id = '${placeId}'
                     WHERE places.id = '${placeId}'
                     GROUP BY places.id`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findByUserId(userId) {
    const dbQuery = `SELECT places.*,
                     CASE
                        WHEN likes.user_id = '${userId}' then true
                        ELSE false
                        END AS is_favorite
                     FROM places
                     LEFT JOIN likes 
                     ON places.id = likes.place_id AND likes.user_id = '${userId}'`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findByUserAndPlaceId(userId, placeId) {
    const dbQuery = `SELECT
                        CASE
                          WHEN likes.user_id = '${userId}' THEN TRUE
                          ELSE false
                          END AS is_favorite
                      FROM places
                      LEFT JOIN likes 
                      ON places.id = likes.place_id and likes.user_id = '${userId}'
                      where places.id = '${placeId}'`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findPlaceTags(placeId) {
    const dbQuery = `SELECT tag
                    FROM tags
                    WHERE tags.place_id = '${placeId}'
                    `

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findUserFavorites(userId) {
    const dbQuery = `SELECT places.*,
                     CASE
                        WHEN likes.user_id = '${userId}' then true
                        ELSE false
                        END AS is_favorite
                     FROM places
                     INNER JOIN likes 
                     ON places.id = likes.place_id AND likes.user_id = '${userId}'`

    const data = await db.query(dbQuery)
    return data.rows
  }

  // static async find() {
  //   const dbQuery = `SELECT * FROM places`

  //   const data = await db.query(dbQuery)
  //   return data.rows
  // }
}

module.exports = Place
