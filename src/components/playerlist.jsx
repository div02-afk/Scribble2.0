import { useEffect, useState } from "react";
import { fetchPlayers } from "./fireBasefunc";

export default function PlayerList({ roomKey }) {
  const [playerList, setPlayerList] = useState([]);

//   console.log(playerList);
  useEffect(() => {
    const fetching = async () => {
      const players = await fetchPlayers(roomKey);
      setPlayerList(players);
    };
    fetching();
  }, [roomKey]);
  return (
    <>
      <div className="w-32 border-2">
        <h1>PlayerList</h1>
        {playerList.map((player) => (
          // {console.log(player)}
          <div>{player}</div>
        ))}
      </div>
    </>
  );
}
