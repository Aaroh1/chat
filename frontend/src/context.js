import { useEffect, useState, useRef } from "react";
import React from "react";
export const Context = React.createContext();
 const ContextProvider = (props) => {
  const [messages, setmessages] = useState([]);
  const [user, setuser] = useState("");
  const [convo, setconvo] = useState("");
  const [userObj, setuserobj] = useState({});
  const setMessages = (message) => {
    setmessages([...messages, message]);
  };

  const setUser = (u) => {
    setuser(u);
  };
  const setConvo = (c) => {
    setconvo(c);
  };
  const setUserObj = (o) => {
    setuserobj(o);
  };
  return (
    <Context.Provider
      value={{
        messages,
        user,
        convo,
        userObj,
        setMessages,
        setUser,
        setConvo,
        setUserObj,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default ContextProvider