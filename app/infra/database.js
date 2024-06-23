const dbconfig = require("../config/database.json")
const { Sequelize } = require('sequelize')

module.exports = new Sequelize({
    'dialect': 'mariadb',
    'database': dbconfig.database,
    'host': dbconfig.host,
    'port': dbconfig.port,
    'username': dbconfig.username,
    'password': dbconfig.password,
})
