import Islogged from "@/components/Islogged";
import TaskCard from "@/components/TaskCards";
import { getSession } from "next-auth/react";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { checkAndSave } from "@/Firebase/UserInit";
import { OnTaskComplete, Task,CoolDownEnded } from "@/Firebase/TaskInit";

export default function Home() {
  const { user, setUser, setTask } = useUserContext();
  const urls = ["https://tii.la/", 'https://shrinke.me/', 'https://enit.in/', 'https://go.aoutoqw.xyz/', 'https://oko.sh/', "davisonbarker.pro", "https://v2links.com/", "https://vzu.us/"];

  const checkCooldown = async (user, eTask) => {
    const completedTask = user.Task?.find((task) => task.Name === eTask.Name);
    if (!completedTask) {
      return;
    }
    const completedTime = new Date(completedTask.CoolDown.seconds * 1000);
    const now = new Date();
    const elapsedHours = (now - completedTime) / 1000 / 60 / 60;
  
  
    if (elapsedHours >= eTask.CoolDownLimit) {
      // const UpdatedTask = user.Task.filter((Task) => Task.Name !== eTask.Name)
      await setUser(prevState => ({...prevState, CompletedTasks: completedTask}))
      await CoolDownEnded(user.discordId, eTask.Name);
    }
  
    return;
  };

  useEffect(() => {
    getSession().then(async (session) => {
      if (urls.includes(document.referrer)) {
        const now = new Date();
        await OnTaskComplete(session.user.id, now);
      } else {
        if (document.referrer.includes("davisonbarker.pro")){
          const now = new Date();
          await OnTaskComplete(session.user.id, now);
        }
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
      
      if (tasks) {
        tasks.map(async (eTask) => {
          await checkCooldown(userDet, eTask);
        });
      } else {
        //Do nothing
      }
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
