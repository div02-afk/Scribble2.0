import React, { useState } from "react";
import Host from "../components/host";
import Join from "../components/join";
// import io from "socket.io-client";
export default function Home() {
  // const socket = io.connect("http://localhost:3000");
  const [ishost, setIshost] = useState(false);
  const [isjoin, setIsjoin] = useState(false);

  return (
    <>
    <div className="flex align-middle h-screen flex-row w-screen ">
      {(ishost || isjoin) && (
        <div
          className="w-10 h-10 border-2 z-100 mr-2.5 mt-2.5 ml-2.5 select-none text-center"
          onClick={() => {
            console.log("clicked")
            setIshost(false);
            setIsjoin(false);
          }}
        >
          Back
        </div>
      )}
      {!ishost && !isjoin && (
        <div className="w-screen h-screen bg-red-100 flex justify-center text-center items-center text-3xl">
          <div
            className="w-32 border-5 mr-20 select-none"
            onClick={() => {
              setIshost(true);
            }}
          >
            Host
          </div>
          <div
            className="w-32 border-5 select-none"
            onClick={() => {
              setIsjoin(true);
            }}
          >
            Join
          </div>
        </div>
      )}

      {ishost && <Host />}
      {isjoin && <Join/>}
      </div>
    </>
  ); // Move this closing curly brace to the correct position
}
