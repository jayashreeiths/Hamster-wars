var admin = require("firebase-admin");

const serviceAccount = require("./hamster-wars-privatekey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function getDatabase() {
    return admin.firestore()
}

module.exports = getDatabase