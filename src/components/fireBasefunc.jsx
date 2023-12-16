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
  async function join(roomKey, name) {
    console.log("joining room");
    let playerList = [...(await fetchPlayers(roomKey))];
    console.log("players:", playerList);
    playerList.push(name);
    console.log("players:", playerList);
    try {
      const playerRef = doc(db, "room", roomKey);
      // Set the "capital" field of the city 'DC'
      await updateDoc(playerRef, {
        playerList: playerList,
      });
      console.log("joined");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function fetchPlayers(roomKey) {
    try {
      const docRef = collection(db, "room");
      const q = query(docRef, where("roomKey", "==", roomKey));
      const querySnapshot = await getDocs(q);
      let Data = querySnapshot.docs.map((doc) => doc.data());
      Data = Data[0].playerList;
      console.log("Data:",Data);
      return Data;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function createNewRoom(data) {
    try {
      const docRef = await setDoc(doc(db, "room",data.roomKey), data);
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  export {fetchPlayers,createNewRoom,join};