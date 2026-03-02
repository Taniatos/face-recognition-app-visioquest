const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://visioquest-backend.onrender.com";

/**
 * Try loading an image with CORS enabled.
 * Returns the HTMLImageElement if successful, or null if CORS blocks it.
 */
export const loadImageWithCors = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

/**
 * Fetch image through backend CORS proxy as base64 data URL.
 */
export const fetchImageViaProxy = async (url) => {
  const response = await fetch(`${BACKEND_URL}/proxy-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(`Proxy fetch failed: ${response.status}`);
  }

  const data = await response.json();
  return data.dataUrl;
};

/**
 * Convert a File object to a data URL string.
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
