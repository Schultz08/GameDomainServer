const {DataType} = require("sequelize");
const db = require("../db");

const Reply = db.define("reply", {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
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
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    }

})

module.exports = Reply;