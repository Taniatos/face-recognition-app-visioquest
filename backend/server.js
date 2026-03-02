const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * CORS Image Proxy
 * Fetches an image from a URL and returns it as a base64 data URL.
 * Used when client-side MediaPipe cannot read pixels from cross-origin images.
 */
app.post("/proxy-image", async (req, res) => {
  try {
    const imageUrl = req.body?.url;
    if (!imageUrl) {
      return res.status(400).json({ error: "No image URL provided (body.url)" });
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(imageUrl);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return res.status(400).json({ error: "URL must use http or https protocol" });
      }
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const response = await fetch(imageUrl, {
      headers: { "User-Agent": "VisioQuest-ImageProxy/1.0" },
      timeout: 15000,
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch image: ${response.statusText}`,
      });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return res.status(400).json({ error: "URL does not point to an image" });
    }

    const buffer = await response.buffer();
    if (buffer.length > 10 * 1024 * 1024) {
      return res.status(413).json({ error: "Image exceeds 10MB size limit" });
    }

    const base64 = buffer.toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    return res.json({ dataUrl });
  } catch (err) {
    console.error("Proxy error:", err.message);
    return res.status(500).json({ error: "Failed to proxy image" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`VisioQuest proxy server running on port ${PORT}`);
});
