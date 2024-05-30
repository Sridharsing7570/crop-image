import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(7 / 1);
  const [initialAspectRatio, setInitialAspectRatio] = useState(7 / 1); // Store the initial aspect ratio

  const getImageAspectRatio = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const aspectRatio = width / height;
        resolve(aspectRatio);
      };
      img.onerror = reject;
    });
  };

  useEffect(() => {
    getImageAspectRatio(image)
      .then((aspectRatio) => {
        console.log("Aspect Ratio:", aspectRatio);
        setAspectRatio(aspectRatio);
        setInitialAspectRatio(aspectRatio); // Set the initial aspect ratio
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
  }, [image]);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    const value = parseFloat(event.target.value);
    if (value === initialAspectRatio) {
      resetCrop();
    } else {
      setAspectRatio(value);
    }
  };

  const resetCrop = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspectRatio(initialAspectRatio); // Reset to initial aspect ratio
  };

  return (
    <div className="cropper">
      <Cropper
        image={image}
        aspect={aspectRatio}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        style={{
          containerStyle: {
            width: "100%",
            height: "80%",
            backgroundColor: "#ffffff",
          },
        }}
      />
      <div className="action-btns">
        <div className="aspect-ratios" onChange={onAspectRatioChange}>
          <label htmlFor="1">
            <input type="radio" id="1" value={1 / 1} name="ratio" />
            1:1
          </label>
          <label htmlFor="2">
            <input type="radio" id="2" value={5 / 4} name="ratio" />
            5:4
          </label>
          <label htmlFor="3" className="custom-curser">
            <input type="radio" id="3"  className="custom-curser"value={4 / 3} name="ratio" />
            4:3
          </label>
          <label htmlFor="4" className="custom-curser">
            <input type="radio" className="custom-curser" id="4" value={3 / 2} name="ratio" />
            3:2
          </label>
          <label htmlFor="5" className="custom-curser">
            <input type="radio" id="5"  className="custom-curser"value={5 / 3} name="ratio" />
            5:3
          </label>
          <label htmlFor="6" className="custom-curser">
            <input type="radio" id="6"  className="custom-curser"value={16 / 9} name="ratio" />
            16:9
          </label>
          <label htmlFor="7" className="custom-curser">
            <input type="radio" id="7" value={3 / 1} className="custom-curser" name="ratio" />
            3:1
          </label>
          <label htmlFor="8" className="custom-curser">
            <input
              type="radio"
              id="8"
              value={initialAspectRatio}
              name="ratio" className="custom-curser"
            />
            Reset
          </label>
        </div>
        <div className="btn-container">
          <button className="btn-1 btn-outline" onClick={onCropCancel}>
            Cancel
          </button>
          <button
            className="btn-1"
            onClick={() => {
              onCropDone(croppedArea);
            }}
          >
            Crop & Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
