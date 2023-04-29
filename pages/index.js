import Islogged from "@/components/Islogged";
import TaskCard from "@/components/TaskCards";
import { getSession, useSession } from "next-auth/react";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { checkAndSave } from "@/Firebase/UserInit";
import { Task } from "@/Firebase/TaskInit";

export default function Home() {
  const { data: session } = useSession();
  const { user, setUser, setTask } = useUserContext();

  useEffect(() => {
    getSession().then(async (session) => {
      if (session == null) return;
      const user = await checkAndSave(session.user);
      const tasks = await Task();
      setUser({
        email: user.email,
        username: user.username,
        profile: session.user.image,
        coin: user.coin,
        isAuth: true,
        isAdmin: user.admin,
        CompletedTasks: user.Task,
      });
      setTask(tasks);
    });
  }, [setTask,setUser]);
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
