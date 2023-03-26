import React, { useEffect, useState, useContext } from "react";
import MessageBubble from "./MessageBubble";
import { Context } from "../context";
export default function MessageDisplay(props) {
  const {
    messages,
    user,
    convo,
    userObj,
    setMessages,
    setUser,
    setUserObj,
    setConvo,
  } = useContext(Context);
  useEffect(()=>console.log(messages),[messages])
  const MessageBubble = (props)=>
    <div
      className=" p-2 rounded-xl m-3 flex flex-wrap w-max bg-white"
      key={props.id}
    >
      {props.message}
    </div>
  const [message, setMessage] = useState("");
  return (
    <div className="bg-yellow-200 h-screen flex flex-col justify-between p-2 m-2 overflow-y-auto ">
      <div className="overflow-scroll flex-1">
        {(!props.messages)
          ? "asdasdas"
          : props.messages[0]?.map((m) => {
            return (
                MessageBubble( {id:m.id,message:m.message,user:m.user_id})
              );
            })}
      </div>
      <div className="flex">
        <input
          type={"text"}
          value={message}
          className="bg-black bg-opacity-40 border border-black rounded-lg py-2 px-1 text-white flex-1 my-2"
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button
          className="bg-primary px-10 py-1 mx-2 rounded-lg"
          onClick={() => {
            if (message) {
              props.socket.emit("newMessageSent", {
                text: message,
                conversation: props.conversation,
                user: props.user.id,
              });
            }
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
