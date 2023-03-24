import React, { useEffect, useState } from "react";
import supabase from "../config/supabase.config";
import MessageBubble from "./MessageBubble";
export default function MessageDisplay(props) {
  let i = 1;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (i <= 1 && props.messages.length) {
      console.log("object")
      setMessages(props.messages);
      i++
    }
  }, []);
  // useEffect(() => {
  //   props.socket.once("newMessageReceived", (params) => {
  //     alert("message aya");
  //     props.messages.push(params.msg.data[0]);
  //     console.log(props.messages);
  //     // supabase
  //     //   .from("messages")
  //     //   .select()
  //     //   .eq("conversation_id", userConversations.current)
  //     //   .order("created_at", { ascending: true })
  //     //   .then((data) => {
  //     //     console.log(data);
  //     //    setmessages([...messagesOld.data, params.msg.data[0]]);
  //     //     console.log("messages refreshed");
  //     //   });
  //   });
  // }, [props.messages]);

  return (
    <div className="bg-yellow-200 h-screen flex flex-col justify-between p-2 m-2 overflow-y-auto ">
      <div className="overflow-scroll flex-1">
        {messages.map((m) => {
          {
            /* setMessages([...messages,m]) */
          }
          return (
            <MessageBubble id={m.id} message={m.message} user={m.user_id} />
          );
        })}
      </div>
      <div className="flex">
        <input
          type={"text"}
          className="bg-black bg-opacity-40 border border-black rounded-lg py-2 px-1 text-white flex-1 my-2"
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button
          className="bg-primary px-10 py-1 mx-2 rounded-lg"
          onClick={() => {
            setMessage("");
            if (message) {
              props.socket.emit("newMessageSent", {
                text: message,
                conversation: props.conversation,
                user: props.user.id,
              });
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
