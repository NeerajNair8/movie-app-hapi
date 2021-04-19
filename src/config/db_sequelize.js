const {
    Sequelize,
    Op,
    Model,
    DataTypes
} = require('sequelize');
// connecting to the database
const sequelize = new Sequelize('movie_app_hapi', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


module.exports = sequelize;