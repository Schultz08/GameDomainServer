const {DataTypes} = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {
    receivingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
    is_read: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = Conversation;

