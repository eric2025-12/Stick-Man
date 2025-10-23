import React from "react";
import { GameProvider } from "./context/GameContext";
import GamePlay from "./gameplay/GamePlay";

function App() {
  return (
    <GameProvider>
      <GamePlay />
    </GameProvider>
  );
}

export default App;
