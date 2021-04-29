const hamsterDatabase = require('../database.js')
const db = hamsterDatabase.getDatabase()

const express = require('express')
const router = express.Router()

//Get Hamsters
router.get("/", async(req, res) => {
    const items = await hamsterDatabase.getCollection("hamsters");
    res.send(items);
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
router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const item = await hamsterDatabase.getDocByID("hamsters", id);
    res.send(item);
});
// post hamsters
router.post("/", async(req, res) => {
    const obj = req.body;

    if (!obj.name ||
        typeof obj.age != "number" ||
        !obj.favFood ||
        !obj.loves ||
        !obj.imgName ||
        typeof obj.wins != "number" ||
        typeof obj.defeats != "number" ||
        typeof obj.games != "number"
    ) {
        res.sendStatus(400);
        return;
    }

    const docRef = await hamsterDatabase.postToCollection("hamsters", obj)

    const newHamster = {
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood,
        loves: req.body.loves,
        imgName: req.body.imgName,
        wins: 0,
        defeats: 0,
        games: 0,
        id: docRef
    }

    res.send(newHamster)

});

//put/hansters

router.put("/:id", async(req, res) => {
    const id = req.params.id
    const obj = req.body
    const response = await hamsterDatabase.putToCollection("hamsters", id, obj)
    res.sendStatus(response);
});

// delete /hamsters


router.delete('/:id', async(req, res) => {


    const items = await hamsterDatabase.deleteDocByID('hamsters', req.params.id)
    res.sendStatus(items)

})






module.exports = router