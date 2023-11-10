import { useEffect, useState ,useRef} from "react";
import { db } from "../firebaseConfig";
import { query, collection,orderBy,limit ,getDocs} from "firebase/firestore";

export default function Opponent() {
  const [imageData, setImageData] = useState("");
  const [eventData, setEventData] = useState([]);
  const fetchEvents = async () => {
    try {
      const imageref = collection(db, "currentImage"); // Use collection to reference the 'Event' collection
      const q = query(imageref, orderBy("time","desc"), limit(1)); // Use collection to reference the 'Event' collection
      
      const querySnapshot = await getDocs(q);
      const Data = querySnapshot.docs.map((doc) => doc.data());
      setImageData(Data[0].payload);
      
    } catch (error) {
      console.error("Error fetching events from Firestore:", error);
      
    }
  };

  useEffect(() => {
    
    console.log("drawing");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    img.src = imageData;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }, [imageData]);
  setInterval(() => {
    fetchEvents();
  }, 1500);
  return (
    <div>
      <h1>Opponent</h1>
      <canvas
        style={{ border: "1px solid black" }}
        id="canvas"
        width="1000"
        height="1000"
      ></canvas>
    </div>
  );
}
