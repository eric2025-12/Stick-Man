import React from "react";

const TrapAnimation = ({ x }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>⚠️ Trap triggered at position {x}!</p>
    </div>
  );
};

export default TrapAnimation;
