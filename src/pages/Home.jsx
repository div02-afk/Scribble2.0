import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, where, doc, updateDoc } from "firebase/firestore";
import { query, orderBy, limit, getDocs } from "firebase/firestore";
export default function Home() {
  const [name, setName] = useState("");
  const [filled, setFilled] = useState(false);
  const [userData, setUserData] = useState([]);
  const [docid, setDocid] = useState("");
  const [ready, setReady] = useState(false);
  // setName(window.localStorage.getItem("name") || "")
  // if(name !== ""){
  //     setFilled(true)
  // }
  async function saveData(name) {
    try {
      const user = {
        name: name,
        time: new Date(),
        ready: false,
      };
      const userref = collection(db, "users"); // Use collection to reference the 'Event' collection
      const q = query(userref, where("name", "==", name)); // Use collection to reference the 'Event' collection
      const querySnapshot = await getDocs(q);
      const Data = querySnapshot.docs.map((doc) => doc.data());
      if (Data.length > 0) {
        console.log("user already exists");
        alert("user already exists");
        return;
      }
      setFilled(true);
      window.localStorage.setItem("name", name);
      const docRef = await addDoc(collection(db, "users"), user);
      console.log("Document written with ID: ", docRef.id);
      setDocid(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const fetchEvents = async () => {
    try {
      const userref = collection(db, "users"); // Use collection to reference the 'Event' collection
      const q = query(userref); // Use collection to reference the 'Event' collection
      const querySnapshot = await getDocs(q);
      const Data = querySnapshot.docs.map((doc) => doc.data());
      setUserData(Data);
      console.log(Data);
      readyorNot();
    } catch (error) {
      console.error("Error fetching events from Firestore:", error);
    }
  };

  const readyorNot = async () => {
    try {
        const userref = collection(db, "users"); // Use collection to reference the 'Event' collection
        const q = query(userref,where("ready","==",false)); // Use collection to reference the 'Event' collection
        const querySnapshot = await getDocs(q);
        const Data = querySnapshot.docs.map((doc) => doc.data());
        if(Data.length === 0){
            console.log("all ready");
        }
        
      } catch (error) {
        console.error("Error fetching events from Firestore:", error);
      }
  }
  const handleSubmit = () => {
    if (name === "") return;
    saveData(name);

    console.log(name);
  };
  async function rewrite() {
    const readyUser = doc(db, "users", docid);
    await updateDoc(readyUser, { ready: !ready });
    setReady(!ready);
  }
  const handleReady = () => {
    rewrite();
    console.log("ready");
  };
  useEffect(() => {
    const intervalId = setInterval(fetchEvents, 3000); // 3000 milliseconds = 3 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <h1>Scribble 2.0</h1>
      <div className="playerlistbox">
        <div className="playerlist">
          {userData.map((user) => {
            return (
              <div className="player" key={user.time}>
                {user.name} is {user.ready ? "ready" : "not ready"}
              </div>
            );
          })}
        </div>
      </div>
      {!filled ? (
        <input
          type="text"
          placeholder="Enter your name"
          required={true}
          value={name}
          className="nameinput"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      ) : null}
      {!filled ? (
        <button className="namebutton" onClick={handleSubmit}>
          Submit
        </button>
      ) : null}
      {filled ? (
        <button className="namebutton" onClick={handleReady}>
          Ready
        </button>
      ) : null}
    </>
  );
}
