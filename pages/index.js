import Islogged from "@/components/Islogged";
import TaskCard from "@/components/TaskCards";
import { getSession } from "next-auth/react";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { checkAndSave } from "@/Firebase/UserInit";
import { OnTaskComplete, Task } from "@/Firebase/TaskInit";
import { discordAuthCol } from "@/Firebase/config";
// const { offerCol, discordAuthCol } = require("./config");
const { getCountFromServer, getDocs, query, where, limit, updateDoc, arrayUnion } = require("firebase/firestore");

export default function Home() {
  const { user, setUser, setTask } = useUserContext();
  const urls = ["https://tii.la/"];

  useEffect(() => {
    
    getSession().then(async (session) => {
      if (session == null) return;
      const user = await checkAndSave(session.user);
      const tasks = await Task();
      await setUser({
        discordId: user.discordId,
        email: user.email,
        username: user.username,
        profile: session.user.image,
        coin: user.coin,
        isAuth: true,
        isAdmin: user.admin,
        CompletedTasks: user.Task,
        isCompleting: user.isCompleting,
      });
      console.log(user)

      if (urls.includes(document.referrer)) {
        const now = new Date();
        OnTaskComplete(user.discordId, now);
        console.log("Bro we done");
      } else {
        console.log("Wtf");
      }
      setTask(tasks);
    });
  }, [setTask, setUser]);
  return (
    <>
      {(() => {
        if (user.isAuth) {
          return <TaskCard />;
        } else {
          return <Islogged />;
        }
      })()}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      props: { session },
    };
  }
  return {
    props: { session },
  };
}
