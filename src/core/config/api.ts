export const API_BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

export async function jumoFetch(endpoint: string, options: RequestInit = {}) {
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${normalizedEndpoint}`;

  const token = typeof window !== "undefined" 
    ? (localStorage.getItem("JUMO_SESSION") || localStorage.getItem("jumo_session_token")) 
    : null;

  const authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders["Authorization"] = `Bearer ${token}`;
    authHeaders["x-jumo-session"] = token;
  }

  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData) && !(body instanceof Blob) && !(body instanceof ArrayBuffer)) {
    body = JSON.stringify(body);
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...authHeaders,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      body,
      headers: defaultHeaders,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData.message || errorData.error || `API Error: ${response.statusText} (${response.status})`;
      const err: any = new Error(msg);
      err.status = response.status;
      err.statusText = response.statusText;
      err.data = errorData;
      throw err;
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
          value: function () {
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
        },
      });
    }

    return data;
  } catch (err: any) {
    console.error(`[jumoFetch ERROR] ${options.method || "GET"} ${url}:`, err.message);
    throw err;
  }
}

