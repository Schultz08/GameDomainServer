const router = require("express").Router();
const {Reply} = require("../models/");


router.post("/reply", (req, res) => {
    let {subject, messageBody, parentMessageId, senderId} = req.body

    Reply.create({
        senderId: req.user.id,
        subject: subject,
        messageBody: messageBody,
        parentMessageId: parentMessageId
    })
    .then(newReply => res.status(200).json({message:"Posted Reply", newReply}))
    .catch(err => res.status(500).json({err: err}))
})

router.get("/getReply/:id", (req, res) => {
    Reply.findOne({where: {id: req.params.id}})
    .then(reply => res.status(200).json({reply}))
    .catch(err => res.status(500).json({err: err}))

})

router.put("/updateReply/:id", (req, res) => {
    let {messageBody} = req.body

    Reply.update({messageBody}, {where: {id: req.params.id}})
    .then(reply => {
        if(reply == 0){
            res.status(500).json({err: "Failed to update"})
        }else{
            res.status(200).json({reply})
        }
    })
})

router.delete("/deleteReply/:id", async (req, res) => {
    let reply = await Reply.findOne({where: {id: req.params.id}})
    .then(foundReply => {
        if(foundReply == null){
            res.status(404).json({err: "Not found"})
        }else{
            return foundReply;
        }
    })
    .catch(err => res.status(500).json({err: err}))

    Reply.destroy({where: {id: req.params.id}})
    .then(numberDeleted => res.status(200).json({message: `deleted ${numberDeleted} reply`, reply: reply}))
    .catch(err => res.status(500).json({err: err}))
})

module.exports = router;