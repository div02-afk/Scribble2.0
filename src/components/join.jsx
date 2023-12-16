import React, { useState } from "react";
import { db } from "../firebaseConfig";
import PlayerList from "./playerlist";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { fetchPlayers } from "./fireBasefunc";


export default function Join() {
  const [name, setName] = useState("");
  const [roomKey, setRoomKey] = useState("");
  const [joined, setJoined] = useState(false);
  async function join() {
    console.log("joining room");
    let playerList = [...(await fetchPlayers(roomKey))];
    console.log("players:", playerList);
    playerList.push(name);
    console.log("players:", playerList);
    try {
      const playerRef = doc(db, "room", roomKey);
      // Set the "capital" field of the city 'DC'
      await updateDoc(playerRef, {
        playerList: playerList,
      });
      console.log("joined");
      setJoined(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
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
              Create Room
            </button>
          </div>
        )}
        {joined && <PlayerList roomKey={roomKey} />}
      </div>
    </>
  );
}
