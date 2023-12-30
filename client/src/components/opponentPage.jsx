import { useEffect, useState, useRef } from "react";
import socket from "./socket";
export default function Opponent() {
  const [imageData, setImageData] = useState("");
  const canvasRef = useRef(null);
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
    <div>
      <h1>Opponent</h1>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black" }}
        id="canvas"
        width="1000"
        height="1000"
      ></canvas>
    </div>
  );
}
