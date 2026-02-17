export const convertDaysToSeconds = (days: number) => {
  return days * 24 * 60 * 60;
};

export const getHiddenPrice = (price: string): string => {
  const numericPrice = parseFloat(price);

  if (isNaN(numericPrice)) return "";

  if (numericPrice <= 1000) return "$";
  if (numericPrice > 1000 && numericPrice <= 2000) return "$$";
  if (numericPrice > 2000 && numericPrice <= 3000) return "$$$";
  if (numericPrice > 3000) return "$$$$";

  return "";
};

export function formatNumber(input: number | string): string {
  // Convert string input to number if needed
  const num = typeof input === "string" ? parseFloat(input) : input;

  // Handle invalid input
  if (isNaN(num)) return "0";

  // Define thresholds
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  // Format based on size
  if (Math.abs(num) >= billion) {
    return (num / billion).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (Math.abs(num) >= million) {
    return (num / million).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (Math.abs(num) >= thousand) {
    return (num / thousand).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return num?.toString();
}
