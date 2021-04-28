const hamsterDatabase = require('../database.js')
const db = hamsterDatabase.getDatabase()

const express = require('express')

//Get Hamsters
const router = express.Router()
router.get('/', async(req, res) => {
    try {
        const items = await hamsterDatabase.getCollection("hamsters");
        res.send(items);
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }


});

// Get Random
router.get('/random', async(req, res) => {
    try {
        const items = await hamsterDatabase.getCollection("hamsters");
        let randomNum = Math.floor(Math.random() * items.length);
        console.log(randomNum)
        res.send(items[randomNum])
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }

});

//Get Hamster by ID
router.get('/:id', async(req, res) => {
    try {
        const items = await hamsterDatabase.getDocByID('hamsters', req.params.id);

        res.send(items);
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }

});

// post hamsters

router.post('/', async(req, res) => {
        try {
            const object = req.body

            if (!ishamstersObject(object)) {
                res.sendStatus(400)
                return
            }

            const docRef = await db.collection("hamsters").add(object)

            res.send(docRef.id)
        } catch (error) {

            console.log('An error occured!' + error.message);
            res.status(500).send(error.message);
        }
    })
    // Put /Hamsters
router.put('/:id', async(req, res) => {
    try {

        const object = req.body
        const id = req.params.id

        if (!object || !id) {
            res.sendStatus(400)
            return
        }

        const docRef = db.collection('hamsters').doc(id)
        await docRef.set(object, { merge: true })
        res.sendStatus(200)
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
})

// delete /hamsters


router.delete('/:id', async(req, res) => {
    try {

        const items = await hamsterDatabase.deleteDocByID('hamsters', req.params.id)
        res.sendStatus(200)
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
})




function ishamstersObject(maybeObject) {

    if (!maybeObject)
        return false
    else if (!maybeObject.favFood || typeof maybeObject.games != "number" || !maybeObject.name || typeof maybeObject.wins != "number" || !maybeObject.loves || typeof maybeObject.age != "number" || typeof maybeObject.defeats != "number" || !maybeObject.imgName)
        return false

    return true
}


module.exports = router