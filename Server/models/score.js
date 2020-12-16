const {DataTypes} = require("sequelize");
const db = require("../db");

const Score = db.define("score", {
    gameName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "compositeIndex"
    }, 
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "compositeIndex"
    }
})

module.exports = Score;
