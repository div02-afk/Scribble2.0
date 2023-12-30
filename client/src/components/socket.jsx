import io from "socket.io-client";
const socket = io.connect("https://scribble-2-0-server.onrender.com");
console.log("socket", socket.connected);
export default socket;