# VisioQuest Face Recognition App

Website: [VisioQuest](https://face-recognition-visioquest.netlify.app).

VisioQuest is a full-stack web application that uses artificial intelligence to detect human faces in images. Users can submit an image URL, and the application will process the image, identify any faces, and draw bounding boxes around each one.

## How It Works

This application uses a secure client-server architecture. The React frontend captures the user's image URL and sends it to a dedicated Node.js backend. This backend server acts as a secure proxy, adding the confidential Clarifai API key before forwarding the request to the Clarifai API for face detection. This ensures that the API key is never exposed on the client-side, following security best practices.

## Key Features

- **Multiple Face Detection:** Utilizes the powerful Clarifai AI model to accurately identify and display bounding boxes for all human faces in an image.
- **Secure Backend:** A Node.js and Express server proxies API requests to protect the Clarifai API key.
- **Responsive Design:** A clean and modern user interface that works seamlessly on desktop and mobile devices.
- **Image Suggestions:** Includes sample images for users to quickly test the application's functionality.

## Technology Stack

### Frontend

- React: A JavaScript library for building user interfaces, utilizing functional components and hooks (`useState`, `useEffect`, `useCallback`).
- JavaScript (ES6+): Modern JavaScript for application logic.
- HTML5 & CSS3: For structuring and styling the application, including responsive design with media queries.
- Font Awesome: For clean and scalable icons.

### Backend

- Node.js: A JavaScript runtime for building the server-side proxy.
- Express.js: A minimal and flexible Node.js web application framework.
- CORS: Middleware for enabling Cross-Origin Resource Sharing.
- Dotenv: For managing secret environment variables (API keys).

### API

- Clarifai API: A third-party AI service used for the core face detection functionality.

## Deployment

This application is deployed with a standard full-stack architecture:

- The frontend is hosted on Netlify.
- The backend is hosted as a web service on Render.

**Note on Backend Hosting:** The backend is deployed on Render's free tier. As a result, the server will "spin down" after a period of inactivity. The first request made after the server has been idle may take up to a minute to process as the service starts back up. Subsequent requests will be fast.
