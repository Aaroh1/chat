import React from "react";

export default function MessageBubble(props) {
  return (
    <div
      className=" p-2 rounded-xl m-3 flex flex-wrap w-max bg-white"
      key={props.id}
    >
      {props.message}
    </div>
  );
}
