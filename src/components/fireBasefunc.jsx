import {
    collection,
    setDoc,
    updateDoc,
    where,
    query,
    getDocs,
    doc
  } from "firebase/firestore";
  import { db } from "../firebaseConfig";

  async function fetchChance(roomKey) {
    try {
      const docRef = collection(db, "room");
      const q = query(docRef, where("roomKey", "==", roomKey));
      const querySnapshot = await getDocs(q);
      let Data = querySnapshot.docs.map((doc) => doc.data());
      Data = Data[0].chance;
      return Data;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function join(roomKey, name) {
    if(fetchStarted(roomKey)){
      console.log("game started");
      return false;
    }
    console.log("joining room");
    let playerList = [...(await fetchPlayers(roomKey))];
    console.log("players:", playerList);
    playerList.push(name);
    console.log("players:", playerList);
    try {
      window.localStorage.setItem("roomKey", roomKey);
      window.localStorage.setItem("name", name);
      const playerRef = doc(db, "room", roomKey);
      // Set the "capital" field of the city 'DC'
      await updateDoc(playerRef, {
        playerList: playerList,
      });
      console.log("joined");
      window.location.href = "/player";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  async function fetchPlayers(roomKey) {
    try {
      console.log("fetching players");
      console.log("roomKey:", roomKey);
      const docRef = collection(db, "room");
      const q = query(docRef, where("roomKey", "==", roomKey));
      const querySnapshot = await getDocs(q);
      let Data = querySnapshot.docs.map((doc) => doc.data());
      console.log("Data:",Data);
      Data = Data[0].playerList;
      return Data;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  async function updateChance(roomKey) {
    const chance =await fetchChance(roomKey)+1;
    const playerList =await fetchPlayers(roomKey);
    const newChance = chance%playerList.length;
    
    try {
      const playerRef = doc(db, "room", roomKey);
      // Set the "capital" field of the city 'DC'
      await updateDoc(playerRef, {
        chance: newChance,
      });
      console.log("chance updated");
    } catch (e) {
      console.error("Error updating chance: ", e);
    }
    
  }
  async function startGame(roomKey) {
    console.log("starting game");
    
    try {
      const playerRef = doc(db, "room", roomKey);
      // Set the "capital" field of the city 'DC'
      await updateDoc(playerRef, {
        started: true,
      });
      console.log("started");
      window.location.href = "/player";
    } catch (e) {
      console.error("Error starting game: ", e);
    }
  }
  async function fetchStarted(roomKey) {
    try {
      const docRef = collection(db, "room");
      const q = query(docRef, where("roomKey", "==", roomKey));
      const querySnapshot = await getDocs(q);
      let Data = querySnapshot.docs.map((doc) => doc.data());
      console.log("Data:",Data);
      Data = Data[0].started;
      return Data;
    } catch (e) {
      console.error("Error checking started: ", e);
    }
  }
  async function createNewRoom(data) {
    try {
      const docRef = await setDoc(doc(db, "room",data.roomKey), data);
      console.log("Document written with ID: ", data.roomKey);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function createCanvas(roomKey) {
    console.log("creating canvas");
    try {
      const docRef = await setDoc(doc(db, "Drawing", roomKey), {
        imageData: "",
        time: 0,
      });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  export {fetchPlayers,createNewRoom,join,startGame,fetchStarted,fetchChance,updateChance,createCanvas};