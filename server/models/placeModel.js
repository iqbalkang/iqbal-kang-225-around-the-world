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

  static async find(skip, limit) {
    const dbQuery = `
                      SELECT places.*, first_name
                      FROM places
                      JOIN users 
                      ON places.user_id = users.id
                      WHERE users.is_public = true
                      OFFSET ${skip} LIMIT ${limit}
                    `

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findByPlaceId(placeId) {
    const dbQuery = `SELECT places.*, first_name,
                     (SELECT COUNT(*) FROM comments WHERE comments.place_id = ${placeId}) AS comments,
                     (SELECT COUNT(*) FROM likes WHERE likes.place_id = ${placeId}) AS likes
                     FROM places 
                     LEFT JOIN likes
                     ON likes.place_id = '${placeId}'
                     LEFT JOIN users
                     ON places.user_id = users.id
                     WHERE places.id = '${placeId}'
                     GROUP BY places.id, first_name`

    const data = await db.query(dbQuery)
    return data.rows[0]
  }

  static async findLikes(placeId) {
    const dbQuery = `SELECT users.id, first_name, last_name, users.image FROM places
                     JOIN likes ON likes.place_id = places.id
                     JOIN users ON likes.user_id = users.id
                     WHERE places.id = ${placeId}
                     `
    // const dbQuery = `SELECT users.id, first_name, last_name, users.image FROM places
    //                  JOIN likes ON likes.place_id = places.id
    //                  JOIN users ON likes.user_id = users.id
    //                  WHERE places.id = '${placeId}'
    //                  `

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findLikesForSignedInUser(placeId, userId) {
    const dbQuery = `SELECT users.id, first_name, last_name, users.image, status FROM places
                     JOIN likes ON likes.place_id = places.id
                     JOIN users ON likes.user_id = users.id
                     LEFT JOIN followers ON followers.follower_id = ${userId} and followers.following_id = users.id
                     WHERE places.id = ${placeId}
                     `
    // const dbQuery = `SELECT users.id, first_name, last_name, users.image FROM places
    //                  JOIN likes ON likes.place_id = places.id
    //                  JOIN users ON likes.user_id = users.id
    //                  WHERE places.id = '${placeId}'
    //                  `

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findAllPlacesByUserId(userId, skip, limit) {
    const dbQuery = `(
                      SELECT places.*, first_name,
                        CASE
                          WHEN likes.user_id = ${userId} then true
                          ELSE false
                          END AS is_favorite
                      FROM places
                      LEFT JOIN users 
                      ON places.user_id = users.id
                      LEFT JOIN likes 
                      ON places.id = likes.place_id AND likes.user_id = ${userId}
                      WHERE places.user_id = ${userId} OR users.is_public = true
                     )
                      UNION
                     (
                      SELECT places.*, first_name,
                        CASE
                          WHEN likes.user_id = ${userId} then true
                          ELSE false
                          END AS is_favorite
                      FROM places
                      JOIN users 
                      ON places.user_id = users.id
                      LEFT JOIN likes 
                      ON places.id = likes.place_id AND likes.user_id = ${userId}
                      JOIN followers 
                      ON followers.following_id = users.id And followers.follower_id = ${userId} AND status = 'accepted'
                     ) OFFSET ${skip} LIMIT ${limit}`

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findUserPlacesByUserId(userId, skip, limit) {
    const dbQuery = `SELECT places.*, first_name                    
                     FROM places                     
                     LEFT JOIN users ON users.id = places.user_id
                     WHERE users.id = ${userId}
                     OFFSET ${skip} LIMIT ${limit} `

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findUserPlacesByUserIdAndSignedInUser(userId, signedInUser, skip, limit) {
    const dbQuery = `SELECT places.*, first_name,
                     CASE
                         WHEN likes.user_id = ${signedInUser} THEN true
                         ELSE false
                         END AS is_favorite
                     FROM places
                     LEFT JOIN likes ON likes.place_id = places.id AND likes.user_id = ${signedInUser}
                     LEFT JOIN users ON users.id = places.user_id
                     WHERE users.id = ${userId}
                     OFFSET ${skip} LIMIT ${limit} `

    const data = await db.query(dbQuery)
    return data.rows
  }

  static async findSinglePlaceByUserAndPlaceId(userId, placeId) {
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

  static async findUserFavorites(userId, skip, limit) {
    const dbQuery = `SELECT places.*,first_name,
                     CASE
                        WHEN likes.user_id = '${userId}' then true
                        ELSE false
                        END AS is_favorite
                     FROM places
                     LEFT JOIN users 
                     ON places.user_id = users.id
                     INNER JOIN likes 
                     ON places.id = likes.place_id AND likes.user_id = '${userId}'
                     OFFSET ${skip} LIMIT ${limit} `

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
