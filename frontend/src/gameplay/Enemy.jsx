import React from "react";

const Enemy = ({ x }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        bottom: "10px",
        width: "30px",
        height: "30px",
        backgroundColor: "red",
        borderRadius: "50%",
      }}
    ></div>
  );
};

export default Enemy;
