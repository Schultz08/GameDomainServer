const router = require("express").Router();
const { Message, Conversation, Reply, User } = require("../models/");
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post("/newMessage", (req, res) => {
    console.log("a,d.sjnF.WJFB,.wkrbjf,.KEWJRBG")
    let { subject, messageBody, receivingId} = req.body

    Conversation.findOne({where: {receivingId: receivingId}})
    .then(reciving => {
        if(!reciving)
        {
            res.status(404).json({error: "404"})
        }
        else{ 
            Message.create({
                senderId: req.user.id,
                subject: subject,
                messageBody: messageBody,
                conversationId: receivingId
                // conversationId: receiving.id for clientside
            })
            .catch(err => res.status(500).json({err: err}))
        }
    })
    .catch(err => res.status(500).json({err: err}))

    Conversation.findOne({where: {receivingId: req.user.id}})
    .then(reciving => {
        if(!reciving)
        {
            res.status(404).json({error: "404"})
        }
        else{ 
            Message.create({
                senderId: req.user.id,
                subject: subject,
                messageBody: messageBody,
                conversationId: req.user.id
                // conversationId: receiving.id for clientside
            })
            .then(newMessage => res.status(200).json({Created: newMessage}))
            .catch(err => res.status(500).json({err: err}))
        }
    })
    .catch(err => res.status(500).json({err: err}))
})

router.get("/byId/:id", (req, res) => {
    Message.findOne({where: {id: req.params.id }, include: [{model: Reply}]})
    .then(data => {
        if(!data){
            res.status(404).json({error: "404"})
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
            res.status(500).json({error: "Failed to update"})
        }
        else{
            res.status(200).json({updated})
        }
    })
    .catch(err => res.status(500).json({error: err}))
})

router.delete("/deleteMessage/:id", (req, res) => {

    Message.destroy({where: {id: req.params.id}})
    .then(data => res.status(200).json({deleted: data}))
    .catch(err => res.status(500).json({error: err}))
})

router.get("/getMail", (req, res) => {
    console.log(req.user.id)
    Conversation.findOne({
        where: {receivingId: req.user.id}, 
        include: [
            {
                model: Message,
                include: [{model:Reply}, {model: User, attributes:["userName", "id"]}]
            },
            {
                model: User, attributes:["userName", "id"]
            }
        ], order:[[Message,"createdAt", "DESC"], [Message, Reply, "createdAt", "DESC"]]
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => res.status(500).json({error: err}))
})



module.exports = router;