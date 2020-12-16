const {DataTypes} = require("sequelize");
const { databaseVersion } = require("../db");
const db = require("../db");

const Conversation = db.define("conversation", {
    recivingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    is_read: {
        type: DataTypes.INTEGER
    }
})

module.exports = Conversation;

