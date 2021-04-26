var admin = require("firebase-admin");
let serviceAccount;
if (process.env.PRIVATE_KEY) {
    // På Heroku
    serviceAccount = JSON.parse(process.env.PRIVATE_KEY)
} else {
    // Lokalt (på min dator)
    serviceAccount = require("./hamster-wars-privatekey.json");
}


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function getDatabase() {
    return admin.firestore()
}

module.exports = getDatabase