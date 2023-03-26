import React, {  useContext } from "react";
import { useEffect, useState, useRef } from "react";
import socket from "../socketConfig";
import supabase from "../config/supabase.config";
import MessageDisplay from "./MessageDisplay";
import { Context } from "../context";
export default function ChatScreen() {
  const {
    messages,
    user,
    convo,
    setMessages,
    setUser,
    // setUserObj,
    setConvo,
  } = useContext(Context);
  const userObj = useRef({})
  const username = useRef("");
  const isRunned = useRef(false);
  const [convos, setConvos] = useState([]);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;
    socket.on("connect", () => {
      console.log("socket connected");
      const currentuser = window.prompt("enter username");
      setUser(currentuser)
      chat(currentuser);
    });
    socket.on("newMessageReceived", (params) => {
      console.log(convo);
      console.log(messages);
      // setMessages()
    });
    async function chat(username1) {
      setUser(username1);
      // setuser(users)
      const user = await supabase
        .from("users")
        .select()
        .eq("username", username1);
      if (!user.data.length) {
        await supabase.from("users").insert([{ username: username1 }]);
        const newUser = await supabase
          .from("users")
          .select()
          .eq("username", username1);
        userObj.current=(newUser.data[0]);
      } else {
        userObj.current=(user.data[0]);
      }
      console.log(userObj);
      supabase
        .from("conversations")
        .select()
        .eq("participant_user_id", userObj.current?.id)
        .then((data, err) => {
          console.log(data);
          setConvos(data.data);
        });
    }

    socket.on("conversationStarted", (params) => {
      console.log(params.messages.data);
      setMessages(params.messages.data);
    });
  }, []);
  function HandleStart(convoid) {
    socket.emit("startConversation", {
      conversation: convoid,
      user: username.current,
    });
    setConvo(convoid);
  }
  function HandleNew(convoid) {
    socket.emit("startConversation", {
      conversation: convoid,
      user: username.current,
    });
    setConvo(convoid);
  }
  const convoBox = (id) => (
    <div
      key={id}
      className="p-5 m-5 bg-indigo-500 "
      onClick={(e) => {
        HandleStart(e.target.innerText);
      }}
    >
      {id}
    </div>
  );
  return (
    <div className="flex h-screen">
      <div className="basis-1/2 flex flex-col justify-between">
        <div>
          Your Previous Conversations
          {convos?.length && convos != null
            ? convos.map((c) => convoBox(c.id))
            : convos == null
            ? "No conversations joined yet"
            : ""}
        </div>
        <div className="flex">
          <input
            placeholder="enter id"
            className="bg-black bg-opacity-40 text-white m-1 placeholder:text-white text-xl py-2 px-1 flex-1"
          ></input>
          <button className="rounded-full bg-gradient-to-r from-green-900 to-teal-400 aspect-square px-4 text-3xl font-bold text-white">
            +
          </button>
        </div>
      </div>
      <div className="basis-1/2">
        {convo ? (
          <MessageDisplay
            conversation={convo}
            messages={messages}
            socket={socket}
            user={userObj.current}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
