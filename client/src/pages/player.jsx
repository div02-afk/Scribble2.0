import React, { useEffect, useState } from "react";

import Opponent from "../components/opponentPage";
import DrawPage from "../components/drawPage";
import WordChoice from "../components/wordChoice";
import socket from "../components/socket";
const findIndex = (name, playerList) => {
  for (let i = 0; i < playerList.length; i++) {
    if (playerList[i] === name) {
      return i;
    } else {
      console.log("current name: ", playerList[i]);
    }
  }
};
export default function Player() {
  const name = window.localStorage.getItem("name");
  const roomKey = window.localStorage.getItem("roomKey");
  let words;
  const [chance, setChance] = useState(0);
  const [myChance, setMyChance] = useState(false);
  useEffect(() => {
    socket.on("chance", (data) => {
      window.localStorage.setItem("words", JSON.stringify(data));
      setChance(data.chance);
      window.localStorage.setItem("chance", data.chance);
    });
  socket.on("selectedWord", (data) => {
    console.log("selected word:",data)
    window.localStorage.setItem("selectedWord", data);
  });
  }, [socket]);
  useEffect(() => {
    socket.emit("joinRoom", {
      room: roomKey,
      playerName: name,
      justJoin: true,
    });
  }, []);
  useEffect(() => {
    setChance(window.localStorage.getItem("chance")||0);
    const playerList = JSON.parse(window.localStorage.getItem("playerList"));
    console.log("playerList", playerList);
    // console.log("name", name);
    const index = findIndex(name, playerList);
    console.log("current chance", chance);
    console.log("index", index);
    if (chance == index) {
      setMyChance(true);
      // console.log("my chance");
    } else {
      setMyChance(false);
    }
  }, [chance]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center text-center bg-green-200">
        {/* {myChance && <h1>your chance</h1>} */}
        {!myChance && (
          <>
            <h1>not your chance</h1>
            <Opponent />
          </>
        )}
        {myChance && (
          <>
            <h1>your chance</h1>
            <DrawPage />
            <WordChoice />
          </>
        )}
      </div>
    </>
  );
}
