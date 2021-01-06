const {DataTypes} = require("sequelize");
const db = require("../db");

const Reply = db.define("reply", {
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
    },
    parentMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }

})

module.exports = Reply;