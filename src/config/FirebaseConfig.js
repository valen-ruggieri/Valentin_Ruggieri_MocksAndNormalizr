const { initializeApp, applicationDefault } = require("firebase-admin/app");

const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp({
  credential: applicationDefault(),
});

const databaseFR = getFirestore(app)


module.exports = databaseFR;