const { offerCol, discordAuthCol } = require("./config");
const { getCountFromServer, getDocs, doc, query, where, limit, updateDoc, arrayUnion, increment, setDoc } = require("firebase/firestore");

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
  try {
    const q = query(discordAuthCol, where("discordId", "==", profileId), limit(1));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs[0].data();
    const s = query(offerCol, where("Name", "==", data.isCompleting), limit(1));
    const SquerySnapshot = await getDocs(s);
    const sdata = SquerySnapshot.docs[0].data();
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      Task: arrayUnion({ Name: data.isCompleting, CoolDown: Time }),
      isCompleting: "",
      coin: increment(sdata.price),
    });
    return;
  } catch (err) {
    return;
    // return err; Can be used to display error in console.log()
  }
};

const CreateTask = async (cooldown, name, price, url) => {
  try {
    const q = query(offerCol, where("url", "==", url), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await setDoc(doc(offerCol), {
        CoolDownLimit: cooldown,
        Name: name,
        price: price,
        url: url,
      });
      return "Done";
    }
    return "Already Exsist"
  } catch (err) {
    return err;
  }
};

module.exports = { Task, OnProgressTask, OnTaskComplete, CreateTask };
