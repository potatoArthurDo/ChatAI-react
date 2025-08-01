import api from "../../api";
import { useEffect, useState } from "react";

const TitleBar = ({sessions, selectedSession, onSessionClick, createSession}) => {

  return (
    <div className="h-screen bg-gray-800 w-[20rem] fixed left-0 top-0 ">
    <p className="cursor-pointer text-white p-3 hover:bg-gray-700"
      onClick={() => createSession()}>  +Add a new conversation</p>
      {sessions.map((session) => (
    <p
        key={session.id}
          className={`px-4 py-2 cursor-pointer rounded ${
            selectedSession === session.id
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 text-gray-300"
          }`}
          onClick={() => onSessionClick(session.id)}
    >
      {session.id}
    </p>
  ))}
    </div>
  );
};

export default TitleBar;
