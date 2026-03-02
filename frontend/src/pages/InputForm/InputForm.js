import React, { useRef, useState } from "react";
import "./InputForm.css";

const InputForm = ({ onInputChange, onButtonSubmit, onFileSelect, inputValue }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      event.target.value = "";
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      id="cover"
      className={`input-form-container ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <form
        method="get"
        action=""
        className="input-box"
        onSubmit={onButtonSubmit}
      >
        <div className="tb center searchline">
          <div className="td">
            <input
              type="text"
              placeholder="Paste an image URL to detect faces"
              required
              className="f4 pa2 w-70 center"
              onChange={onInputChange}
              value={inputValue}
            />
          </div>
          <div className="td" id="s-cover">
            <button
              type="submit"
              className="input-button center grow"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="td" id="upload-cover">
            <button
              type="button"
              className="input-button center grow upload-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Upload an image file"
            >
              <i className="fas fa-upload"></i>
            </button>
          </div>
        </div>
      </form>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {isDragOver && (
        <div className="drop-overlay">
          <p>Drop image here</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
