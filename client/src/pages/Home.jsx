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
      {(ishost || isjoin) && (
        <div
          className="w-10 h-10 border-1"
          onClick={() => {
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
            className="w-32 border-5 mr-20"
            onClick={() => {
              setIshost(true);
            }}
          >
            Host
          </div>
          <div
            className="w-32 border-5"
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
    </>
  ); // Move this closing curly brace to the correct position
}
