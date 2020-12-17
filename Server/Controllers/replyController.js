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

router.get("/getReply/:id", (req, res) => {
    Reply.findOne({where: {id: req.params.id}})

})

module.exports = router;