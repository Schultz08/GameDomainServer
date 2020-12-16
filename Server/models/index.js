const Score = require('./score');
const User = require('./user');

User.hasMany(Score)
Score.belongsTo(User, {foreignKey: "userId"})

module.exports = {Score, User}