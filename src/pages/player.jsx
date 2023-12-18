import React, { useEffect, useState } from "react";
import {
  fetchPlayers,
  fetchChance,
  fetchStarted,
} from "../components/fireBasefunc";
import Opponent from "../components/opponentPage";
import DrawPage from "../components/drawPage";
export default function Player() {
  const [name, setName] = useState(window.localStorage.getItem("name"));
  const [roomKey, setRoomKey] = useState(
    window.localStorage.getItem("roomKey")
  );
  const [playerList, setPlayerList] = useState([]);
  const [chance, setChance] = useState(0);
  const [myChance, setMyChance] = useState(false);
  
  useEffect(() => {
    console.log("chance:", chance);
  console.log("roomKey:", roomKey);
    const player = async () => {
      const players = await fetchPlayers(roomKey);
      const chance = await fetchChance(roomKey);
      console.log("name ", name);
      console.log("index", players.indexOf(name));
      setMyChance(chance == players.indexOf(name));
      setChance(chance);
      setPlayerList([...players]);
    };
    player();
  }, []);
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center text-center bg-green-200">
        {/* {myChance && <h1>your chance</h1>} */}
        {!myChance && (
          <>
            <h1>not your chance</h1>
            <Opponent/>
          </>
        )}
        {myChance && (
          <>
            <h1>your chance</h1>
            <DrawPage/>
          </>
        )}
        
      </div>
    </>
  );
}
