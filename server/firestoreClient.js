const admin = require("firebase-admin");
const serviceAccount = require("./firestore.json");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

class FirestoreClient {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async save(roomNo, data) {
    const db = getFirestore();
    const docRef = db.collection("shopping").doc(roomNo);
    await docRef.set(data);
  }

  async getData(roomNo) {
    const db = getFirestore();
    const docRef = db.collection("shopping").doc(roomNo);
    const data = await docRef.get();
    return data;
  }
}

module.exports = new FirestoreClient();
