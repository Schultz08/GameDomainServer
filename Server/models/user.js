const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    userRole:{
        type: DataTypes.STRING,
        allowNull: true
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "mainTheme"
    },
    adminPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "okiedokie"
    }
    
})

module.exports = User;