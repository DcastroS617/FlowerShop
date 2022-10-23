const {Sequelize} = require('sequelize')

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    '',
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST
    }
)

module.exports = db