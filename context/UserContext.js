import { useState, createContext, useContext, useMemo } from "react";

const Context = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    discordId: "",
    email: "",
    username: "Guest",
    profile: "https://bdw-media-prod.s3.amazonaws.com/ckeditor_uploads/2020/01/16/whoknows.JPG",
    coin: 0.0,
    isAuth: false,
    isAdmin: false,
    CompletedTasks: [],
    isCompleting: "",
  });
  const [task, setTask] = useState(
    useMemo(() => {
      [""];
    })
  );

  return (
    <Context.Provider
      value={{
        user,
        task,
        setUser,
        setTask,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);
