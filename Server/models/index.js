const Score = require("./score");
const User = require("./user");
const Message = require("./message");
const Conversation = require("./conversation")
const Reply = require("./reply")

User.hasMany(Score)
Score.belongsTo(User, {foreignKey: "userId"})

User.hasOne(Conversation, {foreignKey: "recivingId"})
Conversation.belongsTo(User, {foreignKey: "recivingId"})

Conversation.hasMany(Message, {foreignKey: "conversationId"})
Message.belongsTo(Conversation, {foreignKey: "conversationId"})

User.hasMany(Message, {foreignKey: "senderId"})
Message.belongsTo(User, {foreignKey: "senderId"})

User.hasMany(Reply, {foreignKey: "senderId"})
Reply.belongsTo(User, {foreignKey: "senderId"})

Message.hasMany(Reply, {foreignKey: "parentMessageId"})
Reply.belongsTo(Message, {foreignKey: "parentMessageId"})


module.exports = {Score, User, Message, Conversation, Reply}