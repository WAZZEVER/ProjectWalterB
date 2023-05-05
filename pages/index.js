import Islogged from "@/components/Islogged";
import TaskCard from "@/components/TaskCards";
import { getSession } from "next-auth/react";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { checkAndSave } from "@/Firebase/UserInit";
import { OnTaskComplete, Task,CoolDownEnded } from "@/Firebase/TaskInit";

const checkCooldown = async (user, eTask) => {
  const completedTask = user.CompletedTasks.find((task) => task.Name === eTask.Name);

  if (!completedTask) {
    return;
  }
  const completedTime = new Date(completedTask.CoolDown.seconds * 1000);
  const now = new Date();
  const elapsedHours = (now - completedTime) / 1000 / 60 / 60;


  if (elapsedHours >= eTask.CoolDownLimit) {
    const x = await CoolDownEnded(user.discordId, eTask.Name);
  }

  return;
};

export default function Home() {
  const { user, task, setUser, setTask } = useUserContext();
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
      const userDet = await checkAndSave(session.user);
      const tasks = await Task();
      await setTask(tasks);
      await setUser({
        discordId: userDet.discordId,
        email: userDet.email,
        username: userDet.username,
        profile: session.user.image,
        coin: userDet.coin,
        isAuth: true,
        isAdmin: userDet.admin,
        CompletedTasks: userDet.Task,
        isCompleting: userDet.isCompleting,
      });
      tasks?.map(async (eTask) => {
        await checkCooldown(user, eTask);
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
