const matchesDatabase = require('../database.js')
db = matchesDatabase.getDatabase()

const express = require('express')
const router = express.Router()

router.get("/", async(req, res) => {
    const items = await matchesDatabase.getCollection("matches");
    res.send(items);
});
//Get matches by ID
router.get('/:id', async(req, res) => {
    const items = await matchesDatabase.getDocByID('matches', req.params.id);

    res.send(items);
});

// post matches

router.post('/', async(req, res) => {

    const object = req.body

    if (!ismatchesObject(object)) {
        res.sendStatus(400)
        return
    }

    const docRef = await db.collection("matches").add(object)

    res.send(docRef.id)
})



// delete/matches


router.delete('/:id', async(req, res) => {

    const items = await hamsterDatabase.deleteDocByID('hamsters', req.params.id)
    res.sendStatus(200)


})






function ismatchesObject(maybeObject) {

    if (!maybeObject)
        return false
    else if (!maybeObject.winnerID || !maybeObject.loserID)
        return false

    return true
}


module.exports = router