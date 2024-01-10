import { useEffect, useState, useRef } from "react";
import socket from "./socket";
export default function Opponent() {
  const [imageData, setImageData] = useState("");
  const canvasRef = useRef(null);
  const word = window.localStorage.getItem("word");
  const roomKey = window.localStorage.getItem("roomKey");
  const [timeStamp, setTimeStamp] = useState("");
  // socket.emit("joinChannel", window.localStorage.getItem("roomKey"));

  // socket.emit("joinChannel", roomKey);
  useEffect(() => {
    socket.on("print", (data) => {
      // console.log("printing in opponent");
      setImageData(data.imageData);
    });
  },[socket]);
  const wordsGuess = ["hello","there"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    img.src = imageData;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }, [imageData]);

  return (
    <div className="flex flex-row h-screen w-screen">
    <div className="w-full h-full bg-gray-50">
      <h1>Opponent</h1>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black" }}
        id="canvas"
        className="w-2/5 h-2/5"
      ></canvas>
    </div>
    <div className="w-2/5 h-2/5 bg-green-400 flex flex-col justify-end items-center">
      Chat here
      <div className="bg-red-50 text-left w-full text-black">
        {wordsGuess.map((guess,index)=>(
          <div className="ml-5" key = {index}>{guess} {guess === word ? ("correct"):("wrong")}</div>
        ))}
      </div>
      <input className="w-4/5 h-10" placeholder="Type your Guess"></input>
    </div>
    </div>
  );
}
