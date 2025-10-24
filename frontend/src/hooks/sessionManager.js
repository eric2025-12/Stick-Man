export const saveSession = (data) => {
  localStorage.setItem("stickman-game", JSON.stringify(data));
};

export const loadSession = () => {
  const data = localStorage.getItem("stickman-game");
  return data ? JSON.parse(data) : null;
};

export const clearSession = () => {
  localStorage.removeItem("stickman-game");
};
