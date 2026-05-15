import { useContext, useState, useEffect } from "react";
import Chat from "./components/Chat.jsx";
import { MyContaxt } from "./MyContaxt.jsx";
import { ScaleLoader } from "react-spinners";
import { api } from "./api/client.js";

const ChatWindow = () => {
  const [loading, setLoading] = useState(false);

  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChat,
    setNewChat,
    theme,
    showSidebar,
    setShowSidebar,
    getAllThread,
  } = useContext(MyContaxt);

  const getReply = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setNewChat(false);

    try {
      const res = await api.post("/api/chat", {
        message: prompt,
        threadId: currThreadId,
      });

      setReply(res.data.reply);
      getAllThread();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // append new chats to prevChats
  useEffect(() => {
    if (!reply) return;

    // if (prompt && reply) {}

    setPrevChat((prevChat) => [
      ...prevChat,
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: reply,
      },
    ]);
    console.log(reply);

    setPrompt("");
  }, [reply]);

  return (
    <div className={`w-full h-[85%] flex flex-col justify-between `}>
      {!showSidebar && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSidebar((prev) => !prev);
          }}
          className="absolute z-100 top-14 rounded p-1 shadow-lg hover:shadow-purple-600 hover:text-shadow-lg hover:text-shadow-purple-600"
        >
          <i className="fa-solid fa-chevron-right text-xl "></i>
        </button>
      )}

      <div className="w-full flex-1 flex justify-center overflow-hidden">
        <div className="flex-1 flex flex-col max-w-200 w-full overflow-y-auto">
          <Chat />
          <div className="place-self-center mb-20">
            <ScaleLoader color="#9810fa" loading={loading}></ScaleLoader>
          </div>
        </div>
      </div>
      {/* botton section ,Input */}
      <div className="flex flex-col items-center gap-0.5 mx-1">
        {/* input window  */}
        <div
          className={`flex justify-between items-center w-full rounded-2xl pr-6 max-w-200 shadow-md hover:shadow-purple-600 ${theme ? "bg-[rgb(255,255,255,0.05)] text-white " : "bg-gray-100 text-black"}`}
        >
          <input
            type="text"
            placeholder="Ask anything"
            className={`w-full outline-none p-5 ${theme ? "placeholder:text-gray-300" : "placeholder:text-black/60"} `}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && prompt.trim()) {
                e.preventDefault();
                getReply();
              }
            }}
          />
          <button
            id="submit"
            className=""
            onClick={() => {
              getReply();
            }}
          >
            <i
              className={`fa-solid fa-paper-plane text-xl cursor-pointer
            hover:text-shadow-lg hover:text-shadow-purple-600  ${theme ? "bg-[rgb(255,255,255,0.005)] text-white" : "text-black"}`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
