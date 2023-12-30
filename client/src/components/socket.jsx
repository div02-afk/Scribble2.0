import io from "socket.io-client";
const socket = io.connect("https://scribble2-0-server.vercel.app:3000");
export default socket;