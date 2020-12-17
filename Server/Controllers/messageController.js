const router = require("express").Router();
const { Message } = require("../models/");
const { Conversation} = require("../models/");
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post("/newMessage", (req, res) => {
    let { subject, messageBody, recivingId} = req.body

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

router.get("/byId/:id", (req, res) => {
    Message.findOne({where: {id: req.params.id }})
    .then(data => {
        if(!data){
            res.status(404).json({NotFound: "No matching Message"})
        }else{
            res.status(200).json({data})
        }
    })
    .catch(err => res.status(500).json({err: err}))
})

router.put("/updateMessage/:id", (req, res) => {
    let {messageBody} = req.body;
    Message.update({messageBody}, {where: {id: req.params.id}})
    .then(updated => {
        if(updated == 0){
            res.status(500).json({err: "Failed to update"})
        }
        else{
            res.status(200).json({updated})
        }
    })
    .catch(err => res.status(500).json({err: err}))
})

router.delete("/deleteMessage/:id", (req, res) => {

    Message.destroy({where: {id: req.params.id}})
    .then(data => res.status(200).json({deleted: data}))
    .catch(err => res.status(500).json({err: err}))
})



module.exports = router;