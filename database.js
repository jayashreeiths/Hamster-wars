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
//get
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
        return items
    }
    //get by ID
const getDocByID = async(coll, id) => {
    try {
        const docRef = await db.collection(coll).doc(id).get();
        if (!id) {
            return 400;
        }

        if (!docRef.exists) {
            return 404;
        }

        const data = docRef.data();
        data.id = docRef.id;
        return data;
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
};

//post
const postToCollection = async(coll, obj) => {
    try {
        if (obj.constructor === Object && Object.keys(obj).length === 0) {
            return 400;
        }

        const docRef = await db.collection(coll).add(obj);

        if (typeof docRef === "number") {
            res.sendStatus(docRef);
            return;
        }
        return docRef.id;
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
};

//delete
const deleteDocByID = async(col, id) => {
    try {
        const docRef = await db.collection(col).doc(id).get();

        if (!docRef.exists) {
            return 404;
        }

        if (!id) {
            return 400;
        }
        await db.collection(col).doc(id).delete();
        return 200;
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
};
//put
const putToCollection = async(col, id, obj) => {
    try {
        const docRef = await db.collection(col).doc(id).get();
        if (!docRef.exists) {
            return 404;
        }
        if (!id) {
            return 400;
        }
        if (obj.constructor === Object && Object.keys(obj).length === 0) {
            return 400;
        }
        await db.collection(col).doc(id).set(obj, { merge: true });
        return 200;
    } catch (error) {

        console.log('An error occured!' + error.message);
        res.status(500).send(error.message);
    }
};



module.exports = { getCollection, getDatabase, getDocByID, deleteDocByID, postToCollection, putToCollection }