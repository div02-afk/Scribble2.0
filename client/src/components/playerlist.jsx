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
      <div className="w-32 border-2">
        <h1>PlayerList</h1>
        {players.map((player) => (
          // {console.log(player)}
          <div>{player}</div>
        ))}
      </div>
    </>
  );
}
