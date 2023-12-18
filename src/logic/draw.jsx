import { useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc,doc } from "firebase/firestore"; 

async function saveData(data) {
  try {
    const roomkey = window.localStorage.getItem("roomKey");
    const docRef = doc(db, "Drawing", roomkey);
    await updateDoc(docRef, {
      imageData: data.payload,
      time: data.time,
    });
    // console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

const saveDataInterval = async (keyReducer) => {
  try {
    await saveData(keyReducer);
  } catch (error) {
    console.error("Error saving data:", error);
  }
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
      payload: "",
      time: new Date(),
    };
    saveDataInterval(keyReducer);
  }
  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set drawing styles
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = '#000';

    // Draw a line
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
  };

  const stopDrawing = () => {
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setIsDrawing(false);
    keyReducer = {
      payload: canvas.toDataURL(),
      time: new Date(),
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
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
    />
  );
};

// export default DrawableCanvas;


// const Draw = ({ store }) => {
//   useEffect(() => {
//     const drawing = (e) => {
//       if (!isPainting) {

//         return;
//       }

//       ctx.lineWidth = lineWidth;
//       ctx.lineCap = "square";
      
//       ctx.lineTo(
//         e.clientX - canvasOffsetX / 2-100,
//         e.clientY - canvasOffsetY /2
//         // e.clientX - canvasOffsetX / 2 + 10,
//         // e.clientY + 10 - canvasOffsetY / 2
//       );
//       ctx.stroke();
//     };
//     const canvas = document.getElementById("canvas");
//     const toolbar = document.getElementById("toolbar");
//     const ctx = canvas.getContext("2d");
//     const canvasOffsetX = canvas.offsetLeft;
//     const canvasOffsetY = canvas.offsetTop;

//     canvas.width = window.innerWidth - canvasOffsetX;
//     canvas.height = window.innerHeight - canvasOffsetY;
//     let isPainting = false;
//     let lineWidth = 5;
//     let startX;
//     let startY;
//     toolbar.addEventListener("click", (e) => {
//       if (e.target.id === "clear") {
//         console.log("clear");

//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         const keyReducer = {
//           type: "DRAW",
//           payload: canvas.toDataURL(),
//           time: new Date(),
//         };
//         saveDataInterval(keyReducer);
//       }
//     });
//     toolbar.addEventListener("change", (e) => {
//       if (e.target.id === "stroke") {
//         ctx.strokeStyle = e.target.value;
//       }

//       if (e.target.id === "lineWidth") {
//         lineWidth = e.target.value;
//       }
//     });
//     canvas.addEventListener("mousedown", (e) => {
//       console.log("mousedown");
//       isPainting = true;
//       startX = e.clientX;
//       startY = e.clientY;
//     });

//     canvas.addEventListener("mouseup", (e) => {
//       console.log("mouseup");
//       keyReducer = {
//         type: "DRAW",
//         payload: canvas.toDataURL(),
//         time: new Date(),
//       };
//       saveDataInterval(keyReducer);
//       isPainting = false;
//       ctx.stroke();
//       ctx.beginPath();
//     });

//     canvas.addEventListener("mousemove", drawing);
//   }, []);
  
//   return <canvas id="canvas" width="1000" height="1000"></canvas>;
// };

// export default Draw;
