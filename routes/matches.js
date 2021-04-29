const matchesDatabase = require('../database.js')
db = matchesDatabase.getDatabase()

const express = require('express')
const router = express.Router()

router.get("/", async(req, res) => {
    const items = await matchesDatabase.getCollection("matches");
    res.send(items);
});

//Get matches by ID
router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const item = await matchesDatabase.getDocByID("matches", id);
    res.send(item);
});

// post matches
router.post("/", async(req, res) => {
    const obj = req.body;

    if (!obj.winnerId || !obj.loserId) {
        res.sendStatus(400);
        return;
    }

    const docRef = await matchesDatabase.postToCollection("matches", obj)

    const newMatch = {
        winnerId: req.body.winnerID,
        loserId: req.body.loserID,
        id: docRef
    }

    res.send(newMatch)

});

// delete/matches
router.delete('/:id', async(req, res) => {


    const items = await matchesDatabase.deleteDocByID('matches', req.params.id)
    res.sendStatus(items)

})




module.exports = router