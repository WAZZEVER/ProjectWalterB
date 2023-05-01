const { offerCol, discordAuthCol } = require("./config");
const { getCountFromServer, getDocs, query, where, limit, updateDoc, arrayUnion, FieldValue } = require("firebase/firestore");

const Task = async () => {
  try {
    const x = [];
    const snapshot = await getCountFromServer(offerCol);
    if (snapshot.data().count === 0) return;
    const querySnapshot = await getDocs(offerCol);
    querySnapshot.forEach((doc) => {
      x.push(doc.data());
    });
    return x;
  } catch (err) {
    console.log(err);
  }
};

const OnProgressTask = async (profileId, taskName) => {
  const q = query(discordAuthCol, where("discordId", "==", profileId), limit(1));
  const querySnapshot = await getDocs(q);
  const docRef = querySnapshot.docs[0].ref;
  await updateDoc(docRef, {
    isCompleting: taskName,
  });
};

const OnTaskComplete = async (profileId, Time) => {
  const q = query(discordAuthCol, where("discordId", "==", profileId), limit(1));

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs[0].data()
  const s = query(discordAuthCol, where("Name", "==", data.isCompleting), limit(1));
  const SquerySnapshot = await getDocs(s);
  const sdata = SquerySnapshot[0].data();
  const docRef = querySnapshot.docs[0].ref;
  await updateDoc(docRef, {
    Task: arrayUnion([{ Name: data.isCompleting , CoolDown: Time }]),
    isCompleting: "",
    coin: FieldValue.increment(sdata.coin)
  });
};

module.exports = { Task, OnProgressTask, OnTaskComplete };
