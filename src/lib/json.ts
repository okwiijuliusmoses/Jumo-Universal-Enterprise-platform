export function safeJSONParse(value: any, defaultValue: any = null) {
  if (!value || value === "undefined") return defaultValue;
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error("Failed to parse JSON:", value, e);
    return defaultValue;
  }
}
