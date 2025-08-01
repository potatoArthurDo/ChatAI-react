import ChatBox from "../components/ChatComponent/ChatBox";
import TitleBar from "../components/ChatComponent/TitleBar";
import api from "../api";
import { useEffect, useState } from "react";

const Home = () => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [createSession, setCreateSession] = useState("")

  const create_a_session = () => {
    api.post(`chat-session/create-chat-session`)
    .then((res) => {
      const newSession = res.data;
      setCreateSession(newSession.id);
      setSelectedSession(createSession);
    }).catch((err) => {
      console.error("Error while creating session")
    })
  }

  const fetch_messages = (session_id) => {
    api
      .get(`/chat-session/${session_id}/messages`)
      .then((res) => {
        setMessages(res.data);
        setSelectedSession(session_id);
      })
      .catch((err) => {
        console.error("Error while fetching messages");
      });
  };

  const get_all_session = () => {
    api
      .get("/chat-session/get-chat-sessions")
      .then((res) => {
        setSessions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    get_all_session();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      console.log("New selected session:", selectedSession);
    }
  }, [selectedSession]);

  return (
    <div className="custom-dark-gradient relative min-h-screen w-screen overflow-x-hidden flex flex-row items-center justify-center ">
      <TitleBar
        sessions={sessions}
        selectedSession={selectedSession}
        onSessionClick={fetch_messages}
        createSession={create_a_session}
      />
      <ChatBox messages={messages} selectedSession={selectedSession} />
    </div>
  );
};
export default Home;
