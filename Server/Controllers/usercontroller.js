const router = require('express').Router();
const {User} = require('../models/');
const {Conversation} = require("../models/")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UniqueConstraintError } = require('sequelize/lib/errors');


//* REGISTER USER
router.post('/register', async (req, res) => {
    
    let {firstName, lastName, email, password, userName} = req.body;


    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
            userName,
        })
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

       let newConvo =  Conversation.create({
            recivingId: newUser.id,
            groupId: null,
            is_read: null
        }).catch(err => {
            if(err instanceof UniqueConstraintError){
                res.status(409).json({error: "Conversation already exist"})
            }
            else{
                res.status(500).json({error: err})
            }
        })
        
        res.status(201).json({
            message: "User Registered!",
            user: newUser,
            token: token,
            conversation: newConvo
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                error: "Failed to register user."
            })
        }
    }
});


router.post('/login', async (req, res) => {
    let {email, password} = req.body;
    try {
        let loginUser = await User.findOne({
            where: {email}
        })

        if(loginUser == null){
            res.status(404).json({message: "User Not Found"})
        }

        if(loginUser && await bcrypt.compare(password, loginUser.password)) {
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
            res.status(200).json({
                message: "Successful Login",
                user: loginUser,
                token
            })
        } else {
            res.status(401).json({
                error: "Failed to login"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "Error logging in"
        })
    }
});

router.get('/:id', (req, res) => {
    User.findOne({where:{id:req.params.id}})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}) 

module.exports = router;