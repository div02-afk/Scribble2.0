import { useEffect } from "react";
import socket from "../components/socket";


const saveDataInterval =  (keyReducer) => {
  socket.emit("draw", keyReducer);
};
let keyReducer;

import React, { useRef, useState } from 'react';

export default function Draw(){
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e); // To start drawing from the initial point
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    keyReducer = {
      imageData: "",
      time: new Date(),
      room: window.localStorage.getItem("roomKey"),
    };
    saveDataInterval(keyReducer);
  }
  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const strokeColor = document.getElementById('stroke').value;
    const lineWidth = document.getElementById('lineWidth').value;
    // Set drawing styles
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = strokeColor;
    context.lineTo(e.screenX - canvas.offsetLeft, e.screenY - canvas.offsetTop - 100);  
    // Draw a line
    // context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    // const { offsetX, offsetY } = e;
    // context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setIsDrawing(false);
    keyReducer = {
      imageData: canvas.toDataURL(),
      time: new Date(),
      room: window.localStorage.getItem("roomKey"),
    };
    saveDataInterval(keyReducer);
    context.beginPath(); // Start a new path for the next drawing
  };
  useEffect(() => {
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', clearCanvas);
  });

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={600}
      style={{ border: '1px solid #000' }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onTouchMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={stopDrawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
    />
  );
};
export {saveDataInterval};
