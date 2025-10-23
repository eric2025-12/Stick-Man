export const calculateSpeed = (level) => Math.min(10 + level * 2, 50);

export const spawnRate = (level) => Math.max(2000 - level * 100, 500);
