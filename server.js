const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters.js')
const matches = require('./routes/matches.js')
const matchWinners = require('./routes/matchWinners.js')
const winners = require('./routes/winners.js')
const losers = require('./routes/losers.js')


//const PORT = 1339
const PORT = process.env.PORT || 1339
const staticFolder = path.join(__dirname, 'static')


// Middleware
// Logger - skriv ut info om inkommande request
app.use((req, res, next) => {
    console.log(`${req.method}  ${req.url} `, req.params);
    next()
})

app.use(express.json())
app.use(cors())
app.use(express.static(staticFolder))

// Routes

app.get('/', (req, res) => {
        res.send('Hemstarwars project')
    })
    // REST API for /hamsters
app.use('/hamsters', hamsters)
    // REST API for /matches
app.use('/matches', matches)

app.use('/matchWinners', matchWinners)
app.use('/winners', winners)
app.use('/losers', losers)

// Starta servern
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})