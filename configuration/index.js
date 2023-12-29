module.exports.config = {
  database: {
    dbUserName: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  app: {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.SECRET_KEY,
    expiry: process.env.JWT_EXPIRY
  },
};