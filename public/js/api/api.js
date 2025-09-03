var API_URL = "/api";
async function apiFetch(endpoint, method = "GET", body = null, options = {}) {
  const controller = options.controller || new AbortController();
  const signal = controller.signal;

  const fetchOptions = {
    method,
    headers: {
      ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {})
    },
    signal
  };

  if (body) {
    if (body instanceof FormData) {
      fetchOptions.body = body;
    } else if (typeof body === "object") {
      fetchOptions.body = JSON.stringify(body);
    } else {
      fetchOptions.body = body;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP ${response.status}`);
  }

  if (options.responseType === "blob") return response;
  if (options.responseType === "arrayBuffer") return await response.arrayBuffer();

  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export { apiFetch };
