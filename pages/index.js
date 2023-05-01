import Islogged from "@/components/Islogged";
import TaskCard from "@/components/TaskCards";
import { getSession } from "next-auth/react";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { checkAndSave } from "@/Firebase/UserInit";
import { OnTaskComplete, Task } from "@/Firebase/TaskInit";

export default function Home() {
  const { user, setUser, setTask } = useUserContext();
  const urls = ["https://tii.la/"];

  useEffect(() => {
    getSession().then(async (session) => {
      if (urls.includes(document.referrer)) {
        const now = new Date();
        await OnTaskComplete(session.user.id, now);
      } else {
        // Do nothing
      }
      if (session == null) return;
      const user = await checkAndSave(session.user);
      const tasks = await Task();
      setTask(tasks);
      setUser({
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
