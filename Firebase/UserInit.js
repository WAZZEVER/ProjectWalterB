const { discordAuthCol, db } = require("./config");
const { getDocs, setDoc, doc, query, where, limit, getCountFromServer } = require("firebase/firestore");

const checkAndSave = async (profile) => {
  try {
    const snapshot = await getCountFromServer(discordAuthCol);
    if (snapshot.data().count === 0) {
      const x = await setDoc(doc(discordAuthCol), {
        discordId: profile.id,
        username: profile.name,
        email: profile.email,
        coin: 0.0,
        isCompleting: "",
        Task: {},
      });
      return x;
    } else {
      const q = query(discordAuthCol, where("discordId", "==", profile.id), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const x = querySnapshot.docs[0].data();
        if (x.username == "WALTERB") {
          x.admin = true;
        }
        return x;
      } else {
        const x = await setDoc(doc(discordAuthCol), {
          discordId: profile.id,
          username: profile.name,
          email: profile.email,
          coin: 0.0,
          isCompleting: "",
          Task: {},
        });
        return x;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { checkAndSave };
