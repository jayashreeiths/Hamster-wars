const matchwinnerDatabase = require('../database.js')
    //db = matchwinnerDatabase.getDatabase()

const express = require('express')
const router = express.Router()


//Get matcheWinners 

router.get('/:id', async(req, res) => {
    const id = req.params.id
    console.log("match winners")
    try {
        console.log("1")

        const snapshot = await db.collection('matches').where('winnerId', '==', id).get()

        console.log("2")
        if (snapshot.empty) {
            res.status(404).send('no winning matches');
            return;
        }
        console.log("3")

        let matchWins = []
        snapshot.forEach(win => {
            const data = win.data();
            data.id = win.id;
            matchWins.push(data)
            console.log(data.winnerId, id)

        });

        res.send(matchWins);
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }

});



module.exports = router;