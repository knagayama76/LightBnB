const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  port: 5432,
  database: "lightbnb",
});

pool.connect(() => {
  console.log("Connected to database 😎");
});

const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(
      `
    SELECT * FROM users 
    WHERE email = $1
    ;
  `,
      [email]
    )
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(
      `
    SELECT * FROM users 
    WHERE id = $1
    ;
  `,
      [id]
    )
    .then((result) => result.row[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(
      `
    INSERT INTO users (name, password, email)
    VALUES ($1, $2, $3) RETURNING *;
  `,
      [user.name, user.password, user.email]
    )
    .then((result) => result.row[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `
    SELECT * FROM reservations
    JOIN properties ON property_id = properties.id
    WHERE guest_id = $1
    ORDER BY start_date DESC
    LIMIT $2
  `,
      [guest_id, limit]
    )
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  console.log(options);
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    if (queryString.includes("WHERE")) {
      queryString += " AND ";
    } else {
      queryString += " WHERE ";
    }
    queryParams.push(`%${options.city}%`);
    queryString += `city LIKE $${queryParams.length} `;
  }

  // if owner_id is passed in
  if (options.owner_id) {
    if (queryString.includes("WHERE")) {
      queryString += " AND ";
    } else {
      queryString += " WHERE ";
    }
    queryParams.push(options.owner_id);
    queryString += `owner_id = $${queryParams.length}`;
  }

  // minimun price per night
  if (options.minimum_price_per_night && !options.maximum_price_per_night) {
    if (queryString.includes("WHERE")) {
      queryString += " AND ";
    } else {
      queryString += " WHERE ";
    }
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `cost_per_night >= $${queryParams.length}`;
  }

  // maximum price per night
  if (!options.minimum_price_per_night && options.maximum_price_per_night) {
    if (queryString.includes("WHERE")) {
      queryString += " AND ";
    } else {
      queryString += " WHERE ";
    }
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `cost_per_night =< $${queryParams.length}`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    if (queryString.includes("WHERE")) {
      queryString += " AND ";
    } else {
      queryString += " WHERE ";
    }
    queryParams.push(options.minimum_price_per_night * 100);
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `cost_per_night BETWEEN $${queryParams.length - 1} AND $${
      queryParams.length
    }`;
  }

  // minimum_rating
  if (options.minimum_rating) {
    if (queryString.includes("WHERE")) {
      queryString += " AND ";
    } else {
      queryString += " WHERE ";
    }
    queryParams.push(options.minimum_rating);
    queryString += `rating >= $${queryParams.length}`;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  // console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryString = `
    INSERT INTO properties (owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;
`;
  const propertyValues = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
  ];

  return pool
    .query(queryString, propertyValues)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addProperty = addProperty;
