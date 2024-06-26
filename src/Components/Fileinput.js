import React from "react";
import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

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
    <div className="custom-file-container">
      <div className="custum-inside-container">
        <div className="write-text">
          <h1>Crop and Remove background for better composition</h1>
          <p>
            Try our easy-to-use cropping tools to cut any photo down and remove
            background to size to balance your designs or beautifully reframe
            your photography.
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleOnChange}
          style={{ display: "none" }}
        />
        <button className="btn-custom" onClick={onChooseImg}>
          <FaCloudUploadAlt className="custom-react-icon"/>
          Upload your imgae
        </button>
      </div>
    </div>
  );
};

export default Fileinput;
