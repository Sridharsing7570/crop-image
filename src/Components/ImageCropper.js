import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(7 / 1);

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
    // Usage example:
    getImageAspectRatio(image)
      .then((aspectRatio) => {
        console.log("Aspect Ratio:", aspectRatio);
        setAspectRatio(aspectRatio);
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
  }, [image]);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPixels);
    };

    const onAspectRatioChange = (event) => {
      setAspectRatio(parseFloat(event.target.value));
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
          <input type="radio" value={1 / 1} name="ratio" />
          1:1
          <input type="radio" value={5 / 4} name="ratio" />
          5:4
          <input type="radio" value={4 / 3} name="ratio" />
          4:3
          <input type="radio" value={3 / 2} name="ratio" />
          3:2
          <input type="radio" value={5 / 3} name="ratio" />
          5:3
          <input type="radio" value={16 / 9} name="ratio" />
          16:9
          <input type="radio" value={3 / 1} name="ratio" />
          3:1
        </div>
        <div className="btn-container">
          <button className="btn btn-outline" onClick={onCropCancel}>
            Cancel
          </button>
          <button
            className="btn"
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
