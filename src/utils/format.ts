// Helper to pad numbers with leading zero
export const pad = (num: number): string => num.toString().padStart(2, "0");

// Format date into Japanese style
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const dayName = dayNames[date.getDay()];
  return `${year}年${month}月${day}日 (${dayName})`;
};

// Format time HH:MM:SS
export const formatTime = (date: Date): string => {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};
