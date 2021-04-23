const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()

// GET /Hamsters
router.get('/', async(req, res) => {

    const hamsterRef = db.collection('hamsters')
    const snapshot = await hamsterRef.get()

    if (snapshot.empty) {
        res.send([])
        return
    }

    let items = []
    snapshot.forEach(doc => {
        const data = doc.data()
            // we need Id for PUT/POST/DELETE
        data.id = doc.id
        items.push(data)

    })
    res.send(items)
})
router.get('/random', async(req, res) => {
    const hamstersRef = db.collection('hamsters')
    const snapshot = await hamstersRef.get()

    if (snapshot.empty) {
        console.log('hello')
        res.send([])
        return
    }

    let items = []
    snapshot.forEach(doc => {
        const data = doc.data()
        items.push(data)
    });
    let randomNum = Math.floor(Math.random() * items.length);
    console.log(randomNum)
    res.send(items[randomNum])
})
router.get('/:id', async(req, res) => {
    const id = req.params.id
    const docRef = await db.collection('hamsters').doc(id).get()

    if (!docRef.exists) {
        res.status(404).send('Hamster does not exist')
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

    const docRef = await db.collection('hamsters').add(object)
    res.send(docRef.id)
})

router.put('/:id', async(req, res) => {

    const object = req.body
    const id = req.params.id

    if (!object || !id) {
        res.sendStatus(400)
        return
    }


    const docRef = db.collection('hamsters').doc(id)
    await docRef.set(object, { merge: true })
    res.sendStatus(200)
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id

    if (!id) {
        res.sendStatus(400)
        return
    }

    await db.collection('hamsters').doc(id).delete()
    res.sendStatus(200)
})


function ishamstersObject(maybeObject) {
    // Pratigt, men kanske mera lättläst. Kan göras mer kompakt
    if (!maybeObject)
        return false
    else if (!maybeObject.favFood || typeof maybeObject.games != "number" || !maybeObject.name || typeof maybeObject.wins != "number" || !maybeObject.loves || typeof maybeObject.age != "number" || typeof maybeObject.defeats != "number" || !maybeObject.imgName)
        return false

    return true
}


module.exports = router