import { useContext } from "react";
import { MyContaxt } from "../MyContaxt.jsx";
import rehypeHighlight from "rehype-highlight";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "highlight.js/styles/github-dark.css";

const Chat = () => {
  const { newChat, prevChat, theme } = useContext(MyContaxt);

  const safeMarkdown = (value) =>
    typeof value === "string" ? value : "";

  return (
    <div
      className={`w-full flex-1 ${
        theme ? "text-white" : "text-black"
      }`}
    >
      {newChat && (
        <h1 className="text-3xl text-center font-bold mt-10 text-shadow-md text-shadow-purple-600">
          Start a new Chat!
        </h1>
      )}

      {/* chats */}
      <div className="p-10">
        {prevChat?.map((chat, idx) => (
          <div
            key={idx}
            className={`text-[0.9rem] ${
              chat.role === "user"
                ? "flex justify-end"
                : "text-left"
            }`}
          >
            {chat.role === "user" ? (
              <p
                className={`py-2.5 px-5 rounded-xl max-w-120 w-fit mb-5 ${
                  theme ? "bg-[#323232]" : "bg-gray-100"
                }`}
              >
                {safeMarkdown(chat.content)}
              </p>
            ) : (
              <div className="mb-5 w-full">
                <Markdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code({
                      inline,
                      className,
                      children,
                      ...props
                    }) {
                      const match =
                        /language-(\w+)/.exec(className || "");

                      // FIXED CODE STRING
                      const codeString = Array.isArray(children)
                        ? children
                            .map((child) => {
                              if (typeof child === "string") {
                                return child;
                              }

                              if (
                                typeof child === "object" &&
                                child?.props?.children
                              ) {
                                return Array.isArray(
                                  child.props.children
                                )
                                  ? child.props.children.join("")
                                  : child.props.children;
                              }

                              return "";
                            })
                            .join("")
                        : String(children);

                      const cleanCode =
                        codeString.replace(/\n$/, "");

                      // MULTILINE CODE BLOCK
                      if (
                        !inline &&
                        cleanCode.includes("\n")
                      ) {
                        return (
                          <div className="relative my-4">
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  cleanCode
                                )
                              }
                              className="absolute right-3 top-3 text-xs px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white z-10"
                            >
                              <i className="fa-regular fa-copy"></i>{" "}
                              Copy
                            </button>

                            <SyntaxHighlighter
                              style={oneDark}
                              language={
                                match?.[1] || "javascript"
                              }
                              PreTag="div"
                              className="rounded-2xl"
                              {...props}
                            >
                              {cleanCode}
                            </SyntaxHighlighter>
                          </div>
                        );
                      }

                      // INLINE CODE
                      return (
                        <code
                          className="bg-[rgba(255,255,255,0.08)] px-1.5 py-0.5 rounded text-purple-300"
                          {...props}
                        >
                          {cleanCode}
                        </code>
                      );
                    },
                  }}
                >
                  {chat.content}
                </Markdown>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      chat.content
                    )
                  }
                  className="mt-3 px-3 py-1 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-purple-600 transition-all duration-300 text-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.7)]"
                >
                  <i className="fa-regular fa-copy"></i>{" "}
                  Copy Response
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;