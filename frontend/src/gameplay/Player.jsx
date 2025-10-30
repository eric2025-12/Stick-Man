// src/components/Player.jsx
export default function Player(ctx, player, isPunching) {
  if (!ctx || !player) return;

  const { x, y, health, isHit } = player;

  // === PLAYER COLOR LOGIC ===
  // Player flashes red when hit, otherwise blue
  const bodyColor = isHit ? "red" : "blue";

  // === DRAW BODY ===
  ctx.fillStyle = bodyColor;
  ctx.fillRect(x, y - 50, 30, 50);

  // === DRAW HEAD ===
  ctx.beginPath();
  ctx.arc(x + 15, y - 60, 10, 0, Math.PI * 2);
  ctx.fillStyle = "peachpuff";
  ctx.fill();

  // === DRAW ARMS (Punch animation) ===
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 15, y - 40);
  ctx.lineTo(x + (isPunching ? 45 : -15), y - 30);
  ctx.stroke();

  // === DRAW LEGS ===
  ctx.beginPath();
  ctx.moveTo(x + 10, y);
  ctx.lineTo(x, y + 20);
  ctx.moveTo(x + 20, y);
  ctx.lineTo(x + 30, y + 20);
  ctx.stroke();

  // === DRAW HEALTH BAR ===
  ctx.fillStyle = "red";
  ctx.fillRect(x, y - 80, 50, 5);
  ctx.fillStyle = "lime";
  ctx.fillRect(x, y - 80, Math.max(0, health / 2), 5);
}
