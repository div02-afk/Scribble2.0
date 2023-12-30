import io from "socket.io-client";
const socket = io.connect("https://scribble2-0-server.vercel.app");
console.log("socket", socket.connected);
export default socket;