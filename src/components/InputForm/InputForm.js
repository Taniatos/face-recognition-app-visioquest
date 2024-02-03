import React from "react";
import "./InputForm.css"; // Ensure this CSS file contains the merged styles


const InputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div id="cover" className="input-form-container">
      {" "}
      {/* Merged classes */}
      <form
        method="get"
        action=""
        className="input-box"
        onSubmit={onButtonSubmit} // This ensures the onButtonSubmit function is called on form submission
      >
        {" "}
        {/* Merged classes */}
        {/* <p className="f4 center input-descr">
          {"VisioQuest App detects faces in your pictures. Give it a try!"}
        </p> */}
        <div className="tb center searchline">
          {" "}
          {/* Merged classes */}
          <div className="td">
            <input
              type="text"
              placeholder="Search"
              required
              className="f4 pa2 w-70 center" // Keep React-specific classes
              onChange={onInputChange}
            />
          </div>
          <div className="td" id="s-cover">
            <button
              type="submit"
              className="input-button center grow f4 link ph3 pv2 dib br1 black"
              id="btnDetect"
            >
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
