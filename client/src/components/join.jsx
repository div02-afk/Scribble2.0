import React, { useState, useEffect } from "react";
import PlayerList from "./playerlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "./socket";


export default function Join() {
  const [name, setName] = useState("");
  const [roomKey, setRoomKey] = useState("");
  const [joined, setJoined] = useState(false);


  
  const notify = () => {
    // console.log("started game notify");
    toast("Game already started", {
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
  const join = () => {
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("roomKey", roomKey);
    socket.emit("joinRoom", {
      room: roomKey,
      playerName: name,
      justJoin: false,
    });
    setJoined(true);
  };

  useEffect(() => {
    socket.on("gameStarted", (data) => {
      if (data) {
        window.location.href = "/player";
      }
    });
  }, [socket]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center text-center">
        {!joined && (
          <div className="w-64 flex flex-col border-2 text-left gap-2">
            Name
            <input
              type="text"
              className="border-2 border-black w-64"
              required={true}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            Room Key
            <input
              type="text"
              className="border-2 border-black w-64"
              required={true}
              value={roomKey}
              onChange={(e) => {
                setRoomKey(e.target.value);
              }}
            />
            <button
              className="border-2 mt-4 self-center border-black w-32"
              onClick={join}
            >
              Join Game
            </button>
            <ToastContainer />
          </div>
        )}
        {joined && <PlayerList roomKey={roomKey} />}
      </div>
    </>
  );
}
