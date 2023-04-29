import { useState, createContext, useContext, useMemo } from "react";

const Context = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    username: "Guest",
    profile: "https://th.bing.com/th/id/OIP.kTbwBXhl9Ian0CplIpmJlwHaHa?pid=ImgDet&rs=1",
    coin: 0.0,
    isAuth: false,
    isAdmin: false,
    CompletedTasks: [],
  });
  const [task, setTask] = useState(
    useMemo(() => {[""]})
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
