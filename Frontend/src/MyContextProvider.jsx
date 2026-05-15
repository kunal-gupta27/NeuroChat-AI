import { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import { MyContaxt } from "./MyContaxt";
import { api } from "./api/client";

const MyContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChat, setPrevChat] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChat([]);
  };

  const getAllThread = async () => {
    try {
      const response = await api.get("/api/thread");

      const filteredData = response?.data?.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/me");
      setUser(data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Fetch user failed", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.delete("/api/logout");
      setUser(null);
      setAllThreads(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const providerValues = {
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    prevChat,setPrevChat,
    newChat,setNewChat,
    allThreads,setAllThreads,
    showSidebar,setShowSidebar,
    theme,setTheme,
    isLogin,setIsLogin,
    register,setRegister,
    user,setUser,
    loading,setLoading,
    logout,
    fetchUser,
    getAllThread,
    createNewChat,
  };

  return (
    <MyContaxt.Provider value={providerValues}>{children}</MyContaxt.Provider>
  );
};

export default MyContextProvider;
