const {
    Sequelize,
    Op,
    Model,
    DataTypes
} = require('sequelize');

const sequelize = require("./db_sequelize"); // sequelize instance

const Users = sequelize.define('Users', {
    // Model attributes 
    email: {
        type: DataTypes.STRING,
        primaryKey: true, // will be used for login
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await Users.sync();
        console.log("The table for the User model was just (re)created!");
        // console.log(`\n\n, ${Users},\n\n`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

init();
console.log('user_sequelize.js', Users);

module.exports = Users