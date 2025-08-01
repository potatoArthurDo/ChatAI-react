import React from "react";
import ReactMarkdown from "react-markdown";

const ChatText = ({ message, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-xl text-sm shadow whitespace-pre-wrap break-words
        ${isUser ? "bg-blue-900 text-white" : "bg-white text-gray-900 border"}`}
      >
        {isUser ? (
          message
        ) : (
          <ReactMarkdown>{message}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default ChatText;
