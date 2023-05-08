import { useState, createContext, useContext, useMemo } from "react";

const Context = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    discordId: "",
    email: "",
    username: "Guest",
    profile: "https://wallpaperaccess.com/full/765574.jpg",
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
