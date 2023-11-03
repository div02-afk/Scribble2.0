import React, { useEffect } from "react";
import "./App.css";
import Draw from "../logic/draw";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";

function App() {
  
  // const [imageData,set] = store.getState()
  // async function handleSend(){
  //   const response = await fetch("http://localhost:4000/api/save", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(store.getState()),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // }

  return (
    <>
      <div className="container" id="toolbar">
        <h2 className="text-center">Meh</h2>
        <div className="color">
          <label htmlFor="stroke" className="text-color">
            Color
          </label>
          <input
            id="stroke"
            className="form-control"
            name="stroke"
            type="color"
          />
        </div>
        <div className="lineWidth">
          <label htmlFor="lineWidth" className="text-center">
            Line Width
          </label>
          <input
            id="lineWidth"
            className="form-control"
            name="lineWidth"
            type="number"
            defaultValue="5"
          />
        </div>

        <button id="clear" className="btn btn-primary">
          Clear
        </button>
      </div>
      <Draw />
    </>
  );
}

export default App;
