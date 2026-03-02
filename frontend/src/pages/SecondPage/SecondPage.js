import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SecondPage.css";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import InputForm from "../InputForm/InputForm";
import {
  initFaceDetector,
  detectFaces,
} from "../../services/faceDetectionService";
import {
  loadImageWithCors,
  fetchImageViaProxy,
  fileToDataUrl,
} from "../../services/imageProxyService";

const SecondPage = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [error, setError] = useState("");

  const imageRef = useRef(null);

  // Pre-initialize MediaPipe on mount
  useEffect(() => {
    initFaceDetector()
      .then(() => setModelLoading(false))
      .catch((err) => {
        console.error("Failed to initialize face detector:", err);
        setModelLoading(false);
        setError("Failed to load face detection model. Please refresh the page.");
      });
  }, []);

  const runDetection = useCallback(async (imgElement) => {
    try {
      const faceBoxes = await detectFaces(imgElement);
      setBoxes(faceBoxes);
      if (faceBoxes.length === 0) {
        setError("No faces detected in this image.");
      }
    } catch (err) {
      console.error("Detection error:", err);
      setBoxes([]);
      setError("Face detection failed. Please try a different image.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleImageLoad = useCallback(() => {
    const imgElement = imageRef.current;
    if (imgElement && imgElement.naturalWidth > 0 && isLoading) {
      runDetection(imgElement);
    }
  }, [runDetection, isLoading]);

  const handleImageError = useCallback(() => {
    if (imageUrl && !imageUrl.startsWith("data:")) {
      fetchImageViaProxy(imageUrl)
        .then((dataUrl) => setImageUrl(dataUrl))
        .catch(() => {
          setIsLoading(false);
          setError("Could not load this image.");
        });
    } else {
      setIsLoading(false);
      setError("Could not load this image.");
    }
  }, [imageUrl]);

  const processUrl = async (url) => {
    setIsLoading(true);
    setBoxes([]);
    setError("");

    if (url.startsWith("data:")) {
      setImageUrl(url);
      return;
    }

    // Check CORS first, then set imageUrl to avoid race conditions
    const corsImage = await loadImageWithCors(url);
    if (corsImage) {
      setImageUrl(url);
    } else {
      try {
        const dataUrl = await fetchImageViaProxy(url);
        setImageUrl(dataUrl);
      } catch (err) {
        console.error("Proxy fallback failed:", err);
        setIsLoading(false);
        setError(
          "Could not load this image. The URL may be invalid or the server is blocking access."
        );
      }
    }
  };

  const processFile = async (file) => {
    setIsLoading(true);
    setBoxes([]);
    setError("");
    setInput("");

    try {
      const dataUrl = await fileToDataUrl(file);
      setImageUrl(dataUrl);
    } catch (err) {
      console.error("File read error:", err);
      setIsLoading(false);
      setError("Could not read the selected file.");
    }
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      processUrl(input.trim());
    }
  };

  const handleSuggestionClick = (suggestionUrl) => {
    setInput(suggestionUrl);
    processUrl(suggestionUrl);
  };

  const onFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    } else {
      setError("Please select a valid image file (JPEG, PNG, WebP, etc.).");
    }
  };

  return (
    <section className="app-page">
      <div className="second-page-content-box">
        <div className="content-left">
          <InputForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
            onFileSelect={onFileSelect}
            inputValue={input}
          />
          {modelLoading && (
            <div className="model-loading-notice">
              Loading face detection model...
            </div>
          )}
          {error && <div className="error-notice">{error}</div>}
          <FaceRecognition
            imageUrl={imageUrl}
            boxes={boxes}
            isLoading={isLoading}
            imageRef={imageRef}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
          />
        </div>
        <div className="content-right">
          <h3>To try out VisioQuest, follow these simple steps:</h3>
          <div className="steps">
            <ul>
              <li>
                <div className="step-style">Step 1</div> Paste an image URL or
                upload a photo
              </li>
              <li>
                <span className="step-style">Step 2</span> Press the search
                button
              </li>
              <li>
                <span className="step-style">Step 3</span> Enjoy!
              </li>
            </ul>
            <div className="suggestions-div">
              <h4>No time to look for URLs? These are for you:</h4>
              <div className="suggestions-box">
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800"
                    )
                  }
                >
                  1
                </div>
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://images.pexels.com/photos/2198186/pexels-photo-2198186.jpeg"
                    )
                  }
                >
                  2
                </div>
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://images.pexels.com/photos/2833394/pexels-photo-2833394.jpeg"
                    )
                  }
                >
                  3
                </div>
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://media.istockphoto.com/id/1333405308/photo/positive-woman-video-calling-using-laptop-at-home.jpg?s=612x612&w=0&k=20&c=0uH6FbjIvWaxW-tdCZltqbGBlAZuQnVlgr6joXsJxUc="
                    )
                  }
                >
                  4
                </div>
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://images.pexels.com/photos/19402529/pexels-photo-19402529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    )
                  }
                >
                  5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondPage;
