import { useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore"; 

async function saveData(data) {
  try {
    const docRef = await addDoc(collection(db, "currentImage"), keyReducer);
    console.log("Document written with ID: ", docRef.id);
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

const Draw = ({ store }) => {
  useEffect(() => {
    const drawing = (e) => {
      if (!isPainting) {

        return;
      }

      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineTo(
        e.clientX - canvasOffsetX / 2 + 10,
        e.clientY + 10 - canvasOffsetY / 2
      );
      ctx.stroke();
    };
    const canvas = document.getElementById("canvas");
    const toolbar = document.getElementById("toolbar");
    const ctx = canvas.getContext("2d");
    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;
    let isPainting = false;
    let lineWidth = 5;
    let startX;
    let startY;
    toolbar.addEventListener("click", (e) => {
      if (e.target.id === "clear") {
        console.log("clear");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const keyReducer = {
          type: "DRAW",
          payload: canvas.toDataURL(),
          time: new Date(),
        };
        saveDataInterval(keyReducer);
      }
    });
    toolbar.addEventListener("change", (e) => {
      if (e.target.id === "stroke") {
        ctx.strokeStyle = e.target.value;
      }

      if (e.target.id === "lineWidth") {
        lineWidth = e.target.value;
      }
    });
    canvas.addEventListener("mousedown", (e) => {
      console.log("mousedown");
      isPainting = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
      console.log("mouseup");
      keyReducer = {
        type: "DRAW",
        payload: canvas.toDataURL(),
        time: new Date(),
      };
      saveDataInterval(keyReducer);
      isPainting = false;
      ctx.stroke();
      ctx.beginPath();
    });

    canvas.addEventListener("mousemove", drawing);
  }, []);
  
  return <canvas id="canvas" width="500" height="500"></canvas>;
};

export default Draw;
