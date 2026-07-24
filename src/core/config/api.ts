export const API_BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

export async function jumoFetch(endpoint: string, options: RequestInit = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers: defaultHeaders });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data && typeof data === "object") {
    Object.defineProperties(data, {
      ok: {
        value: true,
        writable: true,
        configurable: true,
        enumerable: false,
      },
      json: {
        value: function() {
          return Promise.resolve(this);
        },
        writable: true,
        configurable: true,
        enumerable: false,
      },
      status: {
        value: response.status,
        writable: true,
        configurable: true,
        enumerable: false,
      },
      statusText: {
        value: response.statusText,
        writable: true,
        configurable: true,
        enumerable: false,
      }
    });
  }
  
  return data;
}
