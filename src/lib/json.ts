export function safeJSONParse(json: string, fallback: any = null): any {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}
