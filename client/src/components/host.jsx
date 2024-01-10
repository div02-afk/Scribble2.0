import React, { useEffect, useState } from "react";
import PlayerList from "./playerlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "./socket";
export default function Host() {
  const [hostName, setHostName] = useState("");
  const [joined, setJoined] = useState(false);
  const roomKey = window.localStorage.getItem("roomKey");
  const notify = (e) => {
    toast(e, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const createRoom = () => {
    console.log("hostname", hostName.length);
    if (hostName.length === 0) {
      // alert("enter a valid name");
      notify("Enter a valid name");
      return;
    } 
      console.log("creating room");
      const uniqueID = new Date().getTime().toString();
      const data = {
        room: uniqueID,
        hostName: hostName,
        playerList: [],
        started: false,
        chance: 0,
        words: [],
        word: "",
      };
      const playerData = {
        room: uniqueID,
        playerName: hostName,
        justJoin: false,
      };
      socket.emit("createRoom", data);
      window.localStorage.setItem("roomKey", uniqueID);
      window.localStorage.setItem("name", hostName);
      socket.emit("joinRoom", playerData);

      setJoined(true);
    
  };

  const startGame = async (roomKey) => {
    await socket.emit("startGame", roomKey);
    window.location.href = "/player";
  };

  return (
    <>
    <ToastContainer />
      <div className="flex flex-col justify-center items-center text-center align-middle w-10/12">
        {joined && (
          <>
            <PlayerList roomKey={roomKey} />
          </>
        )}
        {joined && (
          <>
            <div className="w-40  flex flex-col items-center border-2 text-left gap-4">
              Share the Room Key:
            </div>
            <div
              unselectable="off"
              className="text-grey-darkest text-center bg-grey-light px-2 py-2 w-64 select-none"
              onClick={() => {
                navigator.clipboard.writeText(roomKey);
                notify("Copied to Clipboard");
                console.log("copied");
              }}
            >
              
              {roomKey}
            </div>
            <button
              className="w-32 border-2"
              onClick={() => {
                startGame(roomKey);
              }}
            >
              Start Game
            </button>
          </>
        )}
        {!joined && (
          <div 
         
          className="w-64 h-40 flex flex-col items-center border-2 text-left gap-4 select-none">
            Create new Room
            <input
              type="text"
              className="border-2 border-black w-64"
              required={true}
              placeholder="Host Name"
              value={hostName}
              onChange={(e) => {
                setHostName(e.target.value);
              }}
            />
            <button
              className="border-2 border-black w-32 mt-8"
              onClick={createRoom}
            >
              Create Room
            </button>
          </div>
        )}
      </div>
    </>
  );
}
