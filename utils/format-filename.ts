export function formatFileNameAsTitle(fileName: string) {
  // Remove file extension and replace special characters with spaces
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const withSpaces = withoutExtension
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 &2"); // add space between camelcase

  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
    .trim();
}
