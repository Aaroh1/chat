const {
  newMessage,
  startConversation,
} = require("../controllers/chatController");
const events = [
  {
    event: "startConversation",
    handler: async (socket, params) => await startConversation(socket, params),
  },
  {
    event: "newMessageSent",
    handler: async (socket, params) => await newMessage(socket, params),
  },
];
const chatEvents = (socket, io) =>
  events.forEach((e) => {
    socket.on(e.event, async (params) => {
      await e.handler(socket, { ...params, io });
    });
  });
module.exports = chatEvents;
