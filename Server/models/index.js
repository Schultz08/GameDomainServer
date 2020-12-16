const Score = require("./score");
const User = require("./user");
const Message = require("./message");
const Conversation = require("./conversation")

User.hasMany(Score)
Score.belongsTo(User, {foreignKey: "userId"})

Conversation.hasMany(Message)
Message.belongsTo(Conversation)

Message.hasOne(Message, {foreignKey: "parentId"})
Message.belongsTo(Message, {foreignKey: "parentMessageId"})


module.exports = {Score, User}