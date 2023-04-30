const { initializeApp } = require("firebase/app");
const { collection, getFirestore } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyA5cabZFDFcLMl6TNARDfT92t0PTc2dC8o",
  authDomain: "mallory-2981a.firebaseapp.com",
  projectId: "mallory-2981a",
  storageBucket: "mallory-2981a.appspot.com",
  messagingSenderId: "375464208367",
  appId: "1:375464208367:web:af289418749b9071ab781a",
  measurementId: "G-ZQVGY9NXP9",
};
const Gapp = initializeApp(firebaseConfig);
const db = getFirestore(Gapp);
const discordAuthCol = collection(db, "walterB");
const offerCol = collection(db, "Task");

module.exports = { discordAuthCol, offerCol, db };
