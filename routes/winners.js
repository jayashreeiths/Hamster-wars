const matchesDatabase = require('../database.js')
db = matchesDatabase.getDatabase()

const express = require('express')
const router = express.Router()
router.get("/", async(req, res) => {
    try {
        const items = await db.collection("hamsters").orderBy("wins", "desc").limit(5).get();
        const winners = [];
        items.forEach((doc) => {
            winners.push(doc.data());
        });
        res.send(winners)
    } catch (error) {


        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
});



module.exports = router