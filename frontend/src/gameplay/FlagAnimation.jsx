import React from "react";

const FlagAnimation = ({ visible }) => {
  if (!visible) return null;
  return <div className="flag">🚩</div>;
};

export default FlagAnimation;
