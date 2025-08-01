import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import ChatWebSocket from "./ChatWebSocket";
import ChatText from "./ChatText";
import { useEffect } from "react";

const ChatBox = ({messages, selectedSession}) => {
  return (
    <div className="w-[70rem] relative flex flex-col">
      {/* <div className="fixed top-0 lg:left-[25%] lg:w-[70rem] md:w-[50rem] md:left-[40%] sm:w-[30rem] z-10 bg-black">
        <h1 className="text-white text-3xl my-2 pl-4">Chat</h1>
        <hr className="text-gray-500 w-full" />
      </div> */}
      {/* <ChatContainer />
      <ChatInput /> */}
       <div className="w-[65%] ml-[30%] h-full p-6 overflow-y-auto">
      {messages.length === 0 ? (
        <p className="text-gray-400">Select a session to see messages.</p>
      ) : (
        messages.map((msg) => (
          <ChatText
            key={msg.id}
            message={msg.content.text}
            sender={msg.sender}
          />
        ))
      )}
    </div>
     {selectedSession && <ChatWebSocket sessionId={selectedSession} />}

    </div>
  );
};

export default ChatBox;
