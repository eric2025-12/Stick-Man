import React from "react";

const PauseMenu = ({ togglePause }) => {
  return (
    <div className="pause-menu">
      <h2>Game Paused</h2>
      <button onClick={togglePause}>Resume</button>
    </div>
  );
};

export default PauseMenu;
