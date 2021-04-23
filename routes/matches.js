const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()

// GET /matches
router.get('/', async(req, res) => {

    const hamsterRef = db.collection('matches')
    const snapshot = await hamsterRef.get()

    if (snapshot.empty) {
        res.send([])
        return
    }

    let items = []
    snapshot.forEach(doc => {
        const data = doc.data()
        data.id = doc.id
        items.push(data)

    })
    res.send(items)
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const docRef = await db.collection('matches').doc(id).get()

    if (!docRef.exists) {
        res.status(404).send('match does not exist')
        return
    }

    const data = docRef.data()
    res.send(data)
})
router.post('/', async(req, res) => {

    const object = req.body
    console.log("hi")
    if (!ishamstersObject(object)) {
        res.sendStatus(400)
        return
    }

    const docRef = await db.collection('matches').add(object)
    res.send(docRef.id)
})

router.put('/:id', async(req, res) => {

    const object = req.body
    const id = req.params.id

    if (!object || !id) {
        res.sendStatus(400)
        return
    }


    const docRef = db.collection('matches').doc(id)
    await docRef.set(object, { merge: true })
    res.sendStatus(200)
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id

    if (!id) {
        res.sendStatus(400)
        return
    }

    await db.collection('matches').doc(id).delete()
    res.sendStatus(200)
})


function ishamstersObject(maybeObject) {

    if (!maybeObject)
        return false
    else if (!maybeObject.winnerID || !maybeObject.loserID)
        return false

    return true
}


module.exports = router