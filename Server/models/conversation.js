const {DataTypes} = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {
    recivingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: "compositeIndex"
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

