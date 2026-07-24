export const API_BASE_URL = "https://jumo-multitenant-operating-system-9528.onrender.com";

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
  
  return response.json();
}
