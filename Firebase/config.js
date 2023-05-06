const { initializeApp } = require("firebase/app");
const { collection, getFirestore } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyDbCzXFmL3Hyex2uzwiYRaWNvPCWJLudDU",
  authDomain: "testwazz-460a6.firebaseapp.com",
  projectId: "testwazz-460a6",
  storageBucket: "testwazz-460a6.appspot.com",
  messagingSenderId: "226425030359",
  appId: "1:226425030359:web:82ba3348579b4ee5ab9292",
  measurementId: "G-X7XC55K4VE"
};
const Gapp = initializeApp(firebaseConfig);
const db = getFirestore(Gapp);
const discordAuthCol = collection(db, "Wazzever");
const offerCol = collection(db, "Task");

module.exports = { discordAuthCol, offerCol, db };
