import { useState, useEffect } from "react";
import socket from "./socket";

export default function WordChoice() {
  // const words = window.localStorage.getItem("words").split(",");
  const name = window.localStorage.getItem("name");
  console.log("name", name);
  const worde = JSON.parse(window.localStorage.getItem("words")).words;
//   console.log("words", typeof worde);
  let words = ["hello", "i", "am", "here"];
  try {
    words = [...worde];
    // console.log("realWords", words);
  } catch (err) {
    console.log(err);
  }
  const [visible, setVisible] = useState(true);
  useEffect(() => {
      console.log("selectedBy", window.localStorage.getItem("selectedBy"));
    if (window.localStorage.getItem("selectedBy") === name) {
      setVisible(false);
    }
  },);
  useEffect(() => {
    socket.on("selectedWord", (data) => {
      window.localStorage.setItem("selectedBy", data.selectedBy);
        console.log("selected word from server",data.selectedBy);
    });
    
  }, [socket]);

  function selectWord(word) {
    const data = {
      word: word,
      room: window.localStorage.getItem("roomKey"),
      selectedBy: name,
    };
    window.localStorage.setItem("selectedBy", name);
    socket.emit("word", data);
    // window.localStorage.setItem("word", word);
    setVisible(false);
    // let newWords = []
    // for(let i = 0; i < words.length; i++){
    //     if(words[i] !== word){
    //         newWords.push(words[i])
    //     }
    // }
    // window.localStorage.setItem("words", newWords);
  }

  return (
    <>
      {visible && (
        <div className="wordChoice grid-cols-2 w-1/2 h-1/2">
          {words.map((word, index) => (
            <div
              className="word bg-gray-600 border-3"
              key={index}
              onClick={() => {
                selectWord(word);
              }}
            >
              {word}
            </div>
          ))}
        </div>
      )}
    </>
  );

  // Rest of the code...
}
