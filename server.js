const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
console.log("1")
const hamsters = require('./routes/hamsters.js')
console.log("2")
const matches = require('./routes/matches.js')
console.log("3")
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


console.log("4")
    // Routes

app.get('/', (req, res) => {
    res.send('Hemstarwars project')
})
console.log("5")
    // REST API for /hamsters
app.use('/hamsters', hamsters)
    // REST API for /matches
app.use('/matches', matches)


// Starta servern
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})