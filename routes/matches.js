const matchesDatabase = require('../database.js')
db = matchesDatabase.getDatabase()

const express = require('express')
const router = express.Router()

router.get("/", async(req, res) => {
    try {
        const items = await matchesDatabase.getCollection("matches");
        res.send(items);
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }

});
//Get matches by ID
router.get('/:id', async(req, res) => {
    try {
        const items = await matchesDatabase.getDocByID('matches', req.params.id);

        res.send(items);
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }

});

// post matches

router.post('/', async(req, res) => {
    try {
        const object = req.body

        if (!ismatchesObject(object)) {
            res.sendStatus(400)
            return
        }

        const docRef = await db.collection("matches").add(object)

        res.send(docRef.id)
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
})



// delete/matches


router.delete('/:id', async(req, res) => {
    try {
        const items = await hamsterDatabase.deleteDocByID('hamsters', req.params.id)
        res.sendStatus(200)
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }


})






function ismatchesObject(maybeObject) {

    if (!maybeObject)
        return false
    else if (!maybeObject.winnerID || !maybeObject.loserID)
        return false

    return true
}


module.exports = router