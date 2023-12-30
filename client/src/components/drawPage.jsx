import React, { useEffect } from "react";
import "./App.css";
import Draw from "../logic/draw";
import socket from "./socket";
function DrawPage() {

  const saveDataInterval = async (keyReducer) => {
    const room = window.localStorage.getItem("roomKey");
    keyReducer["room"] = room;
    socket.emit("draw", keyReducer);
  }
  const updateChance = async () => {
    console.log("next player")
    const room = window.localStorage.getItem("roomKey");
    await socket.emit("nextPlayer", room);
  };
  
  return (
    <>
      <div className="container h-32 flex flex-row gap-5" id="toolbar">
        <h2 className="text-center">Meh</h2>
        <div className="color">
          <label htmlFor="stroke" className="text-color">
            Color
          </label>
          <input
            id="stroke"
            className="form-control"
            name="stroke"
            type="color"
          />
        </div>
        <div className="lineWidth">
          <label htmlFor="lineWidth" className="text-center">
            Line Width
          </label>
          <input
            id="lineWidth"
            className="form-control"
            name="lineWidth"
            type="number"
            defaultValue="5"
          />
        </div>

        <button id="clear" className="btn btn-primary">
          Clear
        </button>
        <button onClick = {()=>{
          const data = {
            imageData: "",
            time: new Date(),
          };
          saveDataInterval(data);
          updateChance();
        }} >Next Player</button>
      </div>
      <Draw />
    </> 
  );
}

export default DrawPage;
