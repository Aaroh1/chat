const express = require("express");
require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const chatEvents = require("./chatSocket");

/* Socket Initialization */
const app = express();
const httpServer = createServer(app);
const PORT = 5000;
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

/* Chat Socket */
const chatIo = io.of("/chat");
chatIo.on("connection", async (socket) => {
  console.log("socket connected")
  // /* On Connection */
  // if (socket.handshake.query.uuid) {
  //   socket.uuid = socket.handshake.query.uuid;
  // }
  // if (socket.handshake.query.jwt) {
  //   const decodedjwt = decodejwt(socket.handshake.query.jwt);
  //   if (decodedjwt.success) {
  //     socket.userid = decodedjwt.data.user_id;
  //   }
  // }

  chatEvents(socket,chatIo);
  

  socket.on("disconnect", (reason) => {
    console.log("socket disconnected : - ",reason)
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket server is listening on PORT: ${PORT}`);
});
