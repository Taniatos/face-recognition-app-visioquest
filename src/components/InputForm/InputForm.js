import React from "react";
import "./InputForm.css"; 


const InputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div id="cover" className="input-form-container">
    
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
              placeholder="Search"
              required
              className="f4 pa2 w-70 center" 
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
