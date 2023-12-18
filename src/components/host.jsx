import React, { useState } from "react";
import { join, createNewRoom,startGame,createCanvas } from "../components/fireBasefunc";
import PlayerList from "./playerlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Host() {
  const [roomKey, setRoomKey] = useState("");
  const [hostName, setHostName] = useState("");
  const [joined, setJoined] = useState(false);
  async function createRoom() {
    console.log("creating room");
    const uniqueID = new Date().getTime().toString();
    setRoomKey(uniqueID)
    await createCanvas(uniqueID);
    const data = {
      roomKey: uniqueID,
      hostName: hostName,
      playerList: [hostName],
      started:false,
      chance:0
    };
    window.localStorage.setItem("roomKey", uniqueID);
    window.localStorage.setItem("name", hostName);
    console.log(data);
    await createNewRoom(data);
    // join(roomKey, hostName);
    setJoined(true);
  }
  const notify = () => {
    console.log("copy notify");
    console.log("local ",window.localStorage.getItem("roomKey"));
    toast("Copied to Clipboard", {
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
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center text-center">
        {joined && (
          <>
            <div className="w-64 flex flex-col items-center border-2 text-left gap-4">
              Share the Room Key:
            </div>
            <div
              unselectable="off"
              className="text-grey-darkest text-center bg-grey-light px-2 py-2 w-64 select-none"
              onClick={() => {
                navigator.clipboard.writeText(roomKey);
                notify();
                console.log("copied");
              }}
            >
              <ToastContainer />
              {roomKey}
            </div>
          </>
        )}
        {!joined && (
          <div className="w-64 h-32 flex flex-col items-center border-2 text-left gap-4">
            Host Name
            <input
              type="text"
              className="border-2 border-black w-64"
              required={true}
              value={hostName}
              onChange={(e) => {
                setHostName(e.target.value);
              }}
            />
            <button className="border-2 border-black w-32" onClick={createRoom}>
              Create Room
            </button>
          </div>
        )}
        {joined && (
          <>
            <PlayerList roomKey={roomKey} />
            <button className="w-32 border-2" onClick={()=>{startGame(roomKey)}} >Start Game</button>
          </>
        )}
      </div>
    </>
  );
}
