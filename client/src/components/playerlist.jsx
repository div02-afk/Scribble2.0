import { useEffect, useState } from "react";

import socket from "./socket";
export default function PlayerList({ roomKey }) {
  const [players, setPlayerList] = useState([]);
  useEffect(() => {
    console.log("playerList:", players);
    socket.on("players", (data) => {
      window.localStorage.setItem("playerList", JSON.stringify(data.playerList));
      console.log("playerList:", data.playerList);
      setPlayerList(data.playerList);
    });},[socket]);
  
  return (
    <>
      <div className="w-40 border-2 h-40 mb-20">
        <h1>PlayerList</h1>
        {players.map((player,index) => (
          // {console.log(player)}
          <div key = {index}>{player}</div>
        ))}
      </div>
    </>
  );
}
