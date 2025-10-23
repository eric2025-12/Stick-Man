import React from "react";

const LevelNotification = ({ message }) => {
  if (!message) return null;
  return <div className="level-notification">{message}</div>;
};

export default LevelNotification;
