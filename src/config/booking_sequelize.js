//  sequelize definition of the booking table

const {
    Sequelize,
    Op,
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('./db_sequelize');

const Bookings = sequelize.define('Bookings', {
    // Model attributes 
    book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'bookings',
    timestamps: false,
});

const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await Bookings.sync();
        console.log("The table for the Bookings was just (re)created!");
        // console.log(`\n\n, ${Movies},\n\n`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

init();

// console.log('movie_sequelize.js', Movies);
module.exports = Bookings;