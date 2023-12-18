import { useEffect, useState, useRef } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, getDoc, query, where } from "firebase/firestore";

export default function Opponent() {
  const [imageData, setImageData] = useState("");
  const canvasRef = useRef(null);
  const [timeStamp, setTimeStamp] = useState("");

  const fetchEvents = async () => {
    try {
      const roomKey = window.localStorage.getItem("roomKey");
      const docRef = doc(db, "Drawing", roomKey);

    // Create a query with a condition to fetch only if the time is different
    
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Check if the timestamp is different before fetching new data
        if (data.time !== timeStamp) {
          setTimeStamp(data.time);

          // Fetch the new image data only
          setImageData(data.imageData);
        }
      }
    } catch (error) {
      console.error("Error fetching ImageData from Firestore:", error);
    }
  };

  useEffect(() => {
    // Fetch data every 3000ms (3 seconds)
    const intervalId = setInterval(() => {
      fetchEvents();
    }, 3000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [timeStamp]); // Fetch data when the timestamp changes

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
