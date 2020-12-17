const router = require("express").Router();
const { User } = require("../models/");
const { Score } = require("../models/");

const { UniqueConstraintError } = require('sequelize/lib/errors');


// I will make a check on the front to to determin wether or not it is a post for an update by checking the users "vitual" score list for the game name. If the game name is found it is then directed to the update end point.
router.post('/score', async (req, res) => {
    let { gameName, score } = req.body;
    let theID = req.user.id

    try {
        const newPost = await Score.create({
            gameName,
            score,
            userId: req.user.id
        }).catch(err => {
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
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(418).json({
                message: "uhhh TeaPot?"
            })
        }
        else {
            res.status(500).json({
                error: `${gameName} - ${score} - ${theID}`
            })
        }
    }
});

router.get("/singleUserSorces", (req, res) => {

    User.findOne({ where: { id: req.user.id }, include: [{ model: Score }] })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
})

router.put("/updateScore", (req, res) => {
    let { gameName, score } = req.body
    console.log(req.user.id)
    Score.update({score}, {where: {userId: req.user.id, gameName: gameName}})
    .then(oldScore => { console.log(oldScore)
        Score.findOne({where: {userId: req.user.id, gameName: gameName}})
        .then(newScore =>{
            console.log(newScore)
            res.status(200).json({
                newscore: newScore,
                message: "new high score!!",
                oldscore: oldScore
            })
        })
    })
    .catch(err => res.status(500).json({error: err}))
    // User.findOne({
    //     where: { id: req.user.id }, include: [{
    //         model: Score,
    //         where: { gameName: gameName }
    //     }]
    // })
    // .then(data)
    //     .then(data => res.status(200).json({ returned: data }))
})

module.exports = router;