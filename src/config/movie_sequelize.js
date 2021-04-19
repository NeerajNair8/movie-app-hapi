const {
    Sequelize,
    Op,
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('./db_sequelize');

const Movies = sequelize.define('Movies', {
    // Model attributes 
    movie_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    movie_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.STRING
    },
    seats: {
        type: DataTypes.INTEGER
    },
    available: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'movies',
    timestamps: false,
});

const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await Movies.sync();
        console.log("The table for the Movies was just (re)created!");
        // console.log(`\n\n, ${Movies},\n\n`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

init();

// console.log('movie_sequelize.js', Movies);
module.exports = Movies