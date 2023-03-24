import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import socket from "./socketConfig";
import supabase from "./config/supabase.config";
import MessageDisplay from "./Components/MessageDisplay";
function App() {
  const username = useRef("");
  const userObj = useRef({});
  const userConversations = useRef([]);
  const isRunned = useRef(false);
  const [users, setuser] = useState("");
  const [messages, setmessages] = useState([]);
  const [convos, setConvos] = useState([]);
  const [message, setMessage] = useState("");
  const [currentConvo, setCurrentConvo] = useState("");

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;
    socket.on("connect", () => {
      console.log("socket connected");
      const currentuser = window.prompt("enter username");
      chat(currentuser);
    });
    socket.on("newMessageReceived", (params) => {
      console.log(currentConvo)
      console.log(messages)
    });
    async function chat(username1) {
      username.current = username1;
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
        userObj.current = newUser.data[0];
      } else {
        userObj.current = user.data[0];
      }
      console.log(userObj);
      supabase
        .from("conversations")
        .select()
        .eq("participant_user_id", userObj.current.id)
        .then((data, err) => {
          console.log(data);
          setConvos(data.data);
        });
    }

    socket.on("conversationStarted", (params) => {
      console.log(params.messages.data);
      setmessages(params.messages.data);
    });
  }, [currentConvo,messages]);
  function HandleStart(convoid) {
    socket.emit("startConversation", {
      conversation: convoid,
      user: username.current,
    });
    setCurrentConvo(convoid);
  }
  function HandleNew(convoid) {
    socket.emit("startConversation", {
      conversation: convoid,
      user: username.current,
    });
    setCurrentConvo(convoid);
  }
  const convoBox = (id) => (
    <div
      className="p-5 m-5 bg-indigo-500 "
      onClick={(e) => {
        HandleStart(e.target.innerText);
      }}
    >
      {id}
    </div>
  );
  // const messageDisplayArea =()=>(<div className="bg-yellow-200 h-80 p-2 m-2 overscroll-contain">{
  //   messages?.map((m)=>{
  //       messageBubble(m)
  //   })
  // })
  {
    /* <input type={"text"} className="bg-red-100 w-96 h-14 overscroll-contain mt-60 "></input>
</div>)   */
  }
  return (
    <div className="App">
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
          {currentConvo ? (
            <MessageDisplay
              conversation={currentConvo}
              messages={messages}
              socket={socket}
              user={userObj.current}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
