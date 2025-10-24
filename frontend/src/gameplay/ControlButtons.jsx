import React from "react";

const ControlButtons = ({ movePlayer, togglePause }) => {
  return (
    <div className="controls">
      <button onClick={() => movePlayer("left")}>⬅️</button>
      <button onClick={togglePause}>⏸️</button>
      <button onClick={() => movePlayer("right")}>➡️</button>
    </div>
  );
};

export default ControlButtons;
