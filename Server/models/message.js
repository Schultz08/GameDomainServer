const {DataTypes} = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    messageBody: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Message;