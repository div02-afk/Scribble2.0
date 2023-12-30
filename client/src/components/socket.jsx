import io from "socket.io-client";
const socket = io.connect("https://scribble2-0-server-bf7ri33tt-divyam-s-projects.vercel.app");
console.log("socket", socket.connected);
export default socket;