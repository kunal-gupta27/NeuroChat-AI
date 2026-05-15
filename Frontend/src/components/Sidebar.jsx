import { useContext, useEffect } from "react";
import img from "../../public/logo.png";
import { MyContaxt } from "../MyContaxt.jsx";
import { api } from "../api/client.js";

const Sidebar = () => {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setReply,
    setCurrThreadId,
    setPrevChat,
    theme,
    setShowSidebar,
    getAllThread,
    createNewChat,
  } = useContext(MyContaxt);

  useEffect(() => {
    getAllThread();
  }, [currThreadId]);

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await api.get(`/api/thread/${newThreadId}`);
      setPrevChat(response.data);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      await api.delete(`/api/thread/${threadId}`);

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const truncateText = (text, limit = 25) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <section
      className={`flex flex-col w-65 min-h-screen ${
        theme
          ? "bg-[#171717] text-[#b4b4b4]"
          : "text-black bg-gray-50"
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-2 py-1.5 mt-2 mb-1 border border-[rgba(255,255,255,0.5)] bg-transparent rounded-[5px] hover:bg-[rgb(180,180,180,0.05)] cursor-pointer">
            <img
              src={img}
              alt=""
              className="w-9 h-7 hover:shadow-lg hover:shadow-purple-600 rounded-sm"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSidebar((prev) => !prev);
              }}
            >
              <i
                className={`fa-solid fa-arrows-left-right text-xl hover:text-shadow-lg hover:text-shadow-purple-600 ${
                  theme
                    ? "text-white hover:shadow-lg hover:shadow-purple-600"
                    : "text-black"
                } bg-transparent`}
              ></i>
            </button>
          </div>

          {/* New Chat */}
          <button
            onClick={createNewChat}
            className={`flex justify-between items-center px-5 py-2 hover:text-shadow-lg hover:text-shadow-purple-600 ${
              theme
                ? "text-white"
                : "text-black bg-gray-200"
            } font-semibold`}
          >
            New Chat

            <i
              className={`fa-regular fa-pen-to-square text-xl ${
                theme && "hover:shadow-lg hover:shadow-purple-600"
              } bg-transparent`}
            ></i>
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <ul className="p-2 w-full">
            {allThreads?.map((thread) => (
              <li
                key={thread.threadId}
                onClick={() => {
                  changeThread(thread.threadId);
                }}
                className={`group cursor-pointer p-2 mb-1 relative hover:bg-[rgb(180,180,180,0.05)] rounded-lg flex justify-between items-center ${
                  thread.threadId === currThreadId
                    ? "bg-[rgba(180,180,180,0.05)]"
                    : ""
                } ${
                  theme
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {truncateText(thread.title, 25)}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}
                >
                  <i className="fa-regular fa-trash-can cursor-pointer text-sm hover:text-[#f87171] transition-all duration-200"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-auto cursor-context-menu hover:text-shadow-lg hover:text-shadow-purple-600 p-4 border-t text-center ${
          theme
            ? "text-white bg-[#171717] border-[rgb(255,255,255,0.15)]"
            : "text-black bg-gray-50 border-gray-300"
        }`}
      >
        <p className="text-sm leading-7">
          © 2026 NeuroChat AI
          <br />
          Built by{" "}
          <span className="font-semibold text-purple-400">
            Kunal Gupta
          </span>{" "}
          <i className="fa-solid fa-heart text-purple-500"></i>
        </p>
      </div>
    </section>
  );
};

export default Sidebar;