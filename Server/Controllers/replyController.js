const router = require("express").Router();
const {Reply} = require("../models/");


router.post("/reply", (req, res) => {
    let {subject, messageBody, parentMessageId, senderId} = req.body

    Reply.create({
        senderId: senderId,
        subject: subject,
        messageBody: messageBody,
        parentMessageId: parentMessageId
    })
    .then(newReply => res.status(200).json({message:"Posted Reply", newReply}))
})

module.exports = router;