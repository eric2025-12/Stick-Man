export const animateStickman = (setStickmanFrame) => {
  let frame = 0;
  return setInterval(() => {
    frame = (frame + 1) % 4;
    setStickmanFrame(frame);
  }, 150);
  
};
