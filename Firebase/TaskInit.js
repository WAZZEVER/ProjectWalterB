const { offerCol } = require("./config");
const { getCountFromServer, getDocs } = require("firebase/firestore");

const Task = async () => {
  try {
    const x = []
    const snapshot = await getCountFromServer(offerCol);
    if (snapshot.data().count === 0) return;
    const querySnapshot = await getDocs(offerCol);
    querySnapshot.forEach((doc) => {
        x.push(doc.data())
      });
    return x;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { Task }