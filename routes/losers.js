const matchesDatabase = require('../database.js')
db = matchesDatabase.getDatabase()

const express = require('express')
const router = express.Router()

router.get("/", async(req, res) => {
    try {
        const items = await db.collection("hamsters").orderBy("defeats", "desc").limit(5).get();
        const losers = [];
        items.forEach((doc) => {
            losers.push(doc.data());
        });
        res.send(losers)
    } catch (error) {


        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
});


module.exports = router