export function truncateText(text: string | undefined | null, maxLength = 100): string {
  if (!text || typeof text !== "string") {
    console.warn("truncateText: Received invalid text input:", text); // Debug
    return ""; // Return empty string for invalid input
  }
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}