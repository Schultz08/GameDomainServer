const {DataTypes} = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
    senderId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    messageBody: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parentMessageId: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = Message