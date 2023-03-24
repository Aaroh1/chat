import React, { useState } from "react";

export default function NewChat() {
  const [convoid, set] = useState("");
  return (
    <div>
      <input
        placeholder="Conversation id"
        type="text"
        onChange={(e) => set(e.target.value)}
      ></input>
      <button >Join a new Conversation</button>
    </div>
  );
}
