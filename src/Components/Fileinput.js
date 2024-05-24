import React from "react";
import { useRef } from "react";

const Fileinput = ({ onImageSelected }) => {
  const inputRef = useRef();

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        onImageSelected(reader.result, file);
      };
    }
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
      <button className="btn" onClick={onChooseImg}>
        Choose Image
      </button>
    </div>
  );
};

export default Fileinput;
