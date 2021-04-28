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

const db = getDatabase();

const getCollection = async(coll) => {
    const collectionRef = db.collection(coll);
    const snapshot = await collectionRef.get();

    let items = [];

    if (snapshot.empty) {
        return items;
    }

    snapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        items.push(data);
    });

    return items;
};

const getDocByID = async(coll, id) => {
    const docRef = await db.collection(coll).doc(id).get();
    if (!docRef.exists) {
        return 404;
    }
    const data = docRef.data();
    return data;
};


const deleteDocByID = async(coll, id) => {
    if (!id) {
        return (400)

    }

    const docRef = await db.collection(coll).doc(id).delete();
    return docRef

};




/*function ishamstersObject(maybeObject) {
    // Pratigt, men kanske mera lättläst. Kan göras mer kompakt
    if (!maybeObject)
        return false
    else if (!maybeObject.favFood || typeof maybeObject.games != "number" || !maybeObject.name || typeof maybeObject.wins != "number" || !maybeObject.loves || typeof maybeObject.age != "number" || typeof maybeObject.defeats != "number" || !maybeObject.imgName)
        return false

    return true
}*/

module.exports = { getCollection, getDatabase, getDocByID, deleteDocByID }
    //module.exports = { getDocByID, getDatabase ,postDocByID,}
    //module.exports = getDatabase