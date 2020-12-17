const router = require("express").Router();
const { Message } = require("../models/");
const { Conversation} = require("../models/");
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post("/newMessage", (req, res) => {
    let { subject, messageBody, recivingId} = res.body

    Conversation.findOne({where: {recivingId: recivingId}})
    .then(reciving => {
        if(!reciving)
        {
            res.status(404).json({NotFound: "No Reciver"})
        }
        else{ 
            Message.create({
                senderId: req.user.id,
                subject: subject,
                messageBody: messageBody,
                parentMessageId: null
            })
            .then(newMessage => res.status(200).json({Created: newMessage}))
            .catch(err => res.status(500).json({err: err}))
        }
    })
    .catch(err => res.status(500).json({err: err}))
})

module.exports = router;