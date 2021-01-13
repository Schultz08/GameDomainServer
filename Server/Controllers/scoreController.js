const router = require("express").Router();
const { User } = require("../models/");
const { Score } = require("../models/");

const { UniqueConstraintError } = require('sequelize/lib/errors');


// I will make a check on the front to to determin wether or not it is a post for an update by checking the users "vitual" score list for the game name. If the game name is found it is then directed to the update end point.
router.post('/score', async (req, res) => {
    let { gameName, score } = req.body;

    try {
        const newPost = await Score.create({
            gameName,
            score,
            userId: req.user.id
        })
        .catch(err => {
            if (err instanceof UniqueConstraintError) {
                res.status(409).json({error: "duplicated entries"})
            }
            else {
                res.status(500).json({ err: err })
            }
        })
        res.status(201).json({
            message: "Score Posted",
            user: newPost,
        });
    } catch (err) {
        if (error instanceof UniqueConstraintError) {
            res.status(418).json({
                message: "uhhh TeaPot?"
            })
        }
        else {
            res.status(500).json({
                err: err
            })
        }
    }
});

router.get("/allScores", (req, res) => {
    Score.findAll({order:[["score", "DESC"]],include: [{model: User, attributes:["userName"]}]})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(200).json({err: err}))
})

router.get("/singleUserSorces", (req, res) => {

    User.findOne({ where: { id: req.user.id }, include: [{ model: Score }] })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
})

router.put("/updateScore", (req, res) => {
    let { gameName, score } = req.body;

    Score.update({score}, {where: {userId: req.user.id, gameName: gameName}})
    .then(oldScore => {
        Score.findOne({where: {userId: req.user.id, gameName: gameName}})
        .then(newScore => {
            res.status(200).json({
                newscore: newScore,
                message: "new high score!!",
                oldscore: oldScore
            })
        })
    })
    .catch(err => res.status(500).json({error: err}))

})

module.exports = router;