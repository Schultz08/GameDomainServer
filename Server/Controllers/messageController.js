const router = require("express").Router();
const { Message } = require("../models/");
const { Conversation} = require("../models/");
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post("/newMessage", (req, res) => {
    let { subject, messageBody, recivingId} = req.body
    console.log(recivingId)

    Conversation.findOne({where: {recivingId: recivingId}})
    .then(reciving => {
        console.log(reciving)
        if(!reciving)
        {
            res.status(404).json({NotFound: "No Reciver"})
        }
        else{ 
            Message.create({
                senderId: req.user.id,
                subject: subject,
                messageBody: messageBody,
                conversationId: recivingId
                // conversationId: reciving.id for clientside
            })
            .then(newMessage => res.status(200).json({Created: newMessage}))
            .catch(err => res.status(500).json({err: err}))
        }
    })
    .catch(err => res.status(500).json({err: err}))
})

module.exports = router;