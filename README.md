# VisioQuest

AI-powered face detection web app — detect human faces in any image, instantly.

**Live:** [face-recognition-visioquest.netlify.app](https://face-recognition-visioquest.netlify.app)

## What It Does

- **Face Detection** — Submit an image URL or upload a photo to detect all faces
- **Client-Side AI** — Uses MediaPipe Face Detection running entirely in the browser
- **File Upload** — Drag-and-drop or pick a local image file
- **Sample Images** — Quick-test with built-in image suggestions
- **Responsive UI** — Clean interface with particle background, works on desktop and mobile
- **CORS Proxy Fallback** — Backend proxies images when cross-origin access is blocked

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (CRA), JavaScript (ES6+), CSS3 |
| Backend | Node.js, Express.js (CORS image proxy) |
| Face Detection | MediaPipe Face Detection (@mediapipe/tasks-vision) |
| UI | particles-bg, react-parallax-tilt, Font Awesome |
| Deployment | Netlify (frontend), Render (backend) |

## Project Structure

```
face-recognition-app-visioquest/
├── frontend/                # React 18 (CRA, JavaScript)
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── services/        # Face detection + image proxy services
│       └── pages/
│           ├── LandingPage/
│           ├── SecondPage/
│           ├── InputForm/
│           └── FaceRecognition/
└── backend/                 # Node.js + Express
    └── server.js            # CORS image proxy (no API keys needed)
```

## Getting Started

### Prerequisites
- Node.js 18+

### Setup

```bash
# Frontend
cd frontend && npm install && npm start
# → localhost:3000

# Backend (in another terminal — only needed for CORS-blocked images)
cd backend && npm install && node server.js
# → localhost:3001
```

## How It Works

1. **Enter an image** — Paste a URL, upload a file, or pick a sample image
2. **MediaPipe runs in-browser** — The face detection model loads once and processes images client-side (no API keys needed)
3. **Bounding boxes rendered** — Detected faces are highlighted with positioned overlays
4. **CORS fallback** — If the browser can't access an image's pixels due to cross-origin restrictions, the backend proxies it as a base64 data URL

## Features

| Feature | Details |
|---------|---------|
| Face detection | MediaPipe blaze_face_short_range model, runs client-side via WASM |
| URL input | Paste any image URL; CORS-safe images detected directly |
| File upload | File picker + drag-and-drop on the input area |
| Multiple faces | All detected faces get individual bounding boxes |
| Sample suggestions | 5 built-in image URLs for quick testing |
| Loading states | Spinner during image load + model initialization notice |
| Error handling | User-friendly messages for invalid URLs, failed loads, no faces found |
| Responsive | Adapts to desktop, tablet, and mobile viewports |

## Deployment

- **Frontend:** Netlify — auto-deploys from main branch
- **Backend:** Render free tier — only used for CORS image proxying; server spins down after inactivity


