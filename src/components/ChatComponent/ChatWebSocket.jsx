import React, { useEffect, useRef, useState } from "react";
import { ACCESS_TOKEN } from "../../constants";
import ChatText from "./ChatText";

function ChatWebSocket({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    console.log("websocket sessionId:", sessionId);

  })
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      console.error("Missing token");
      return;
    }

    const wsUrl = `ws://localhost:8000/chat-session/ws/${sessionId}/?token=${token}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const chunk = event.data;

      // Append each chunk to the last bot message or create a new one
      setMessages((prevMessages) => {
        const lastMsg = prevMessages[prevMessages.length - 1];

        if (lastMsg && lastMsg.from === "bot" && !lastMsg.done) {
          // Update the last bot message by appending chunk
          const updated = [...prevMessages];
          updated[updated.length - 1] = {
            ...lastMsg,
            text: lastMsg.text + chunk,
          };
          return updated;
        } else {
          // First chunk of new bot response
          return [...prevMessages, { from: "bot", text: chunk, done: false }];
        }
      });
    };

    socketRef.current.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (trimmed && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ text: trimmed }));
      setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen mt-5 p-4">
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto ml-[30%] space-y-2 px-4 py-2 mb-20 w-[70%] scrollbar-hide">
        {messages.map((msg, idx) => (
          <ChatText key={idx} message={msg.text} sender={msg.from} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] h-[15%] fixed bottom-0 left-[35%] mt-4 flex items-center gap-2 border-t pt-4 bg-gray-200 px-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWebSocket;
