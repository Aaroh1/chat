import { io } from "socket.io-client";
let chatSocketURL = "localhost:5000/chat";
const chatSocket = io(chatSocketURL);
export default chatSocket