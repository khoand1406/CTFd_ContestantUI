export const formatTime = (seconds: number | null): string => {
  if (seconds === null) return "--:--";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const getFileName = (filePath: string): string => {
  const pathParts = filePath.split("/");
  const fullName = pathParts[pathParts.length - 1];
  return fullName.split("?")[0];
};