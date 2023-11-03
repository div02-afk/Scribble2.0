import { useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore"; 

async function saveData(data) {
  try {
    const docRef = await addDoc(collection(db, "currentImage"), keyReducer);
    // console.log(keyReducer)
    console.log("Document written with ID: ", docRef.id, keyReducer);
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

      

      // database.ref("drawing").on("value", (snapshot) => {
      //   const data = snapshot.val();
      //   if (data) {
      //     // Clear the canvas
      //     ctx.clearRect(0, 0, canvas.width, canvas.height);

      //     // Redraw the lines
      //     data.forEach((line) => {
      //       ctx.beginPath();
      //       ctx.moveTo(line.startX, line.startY);
      //       ctx.lineTo(line.endX, line.endY);
      //       ctx.stroke();
      //     });
      //   }
      // });

      // const change = () => {console.log(store.getState())}
      // store.subscribe(change)

      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      // console.log(canvasOffsetX, canvasOffsetY);
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
      
      // interval = setInterval(() => saveDataInterval(keyReducer), 2000);
      isPainting = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
      console.log("mouseup");
      // clearInterval(interval);
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
