import React, { useState } from "react";
import "./App.css";
import Fileinput from "./Components/Fileinput";
import ImageCropper from "./Components/ImageCropper";
import { removeBackground } from "@imgly/background-removal";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";

const App = () => {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [imgAfterBackgroundRemoval, setImgAfterBackgroundRemoval] =
    useState("");
  const [cropDetails, setCropDetails] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [backgroundRemovedFile, setBackgroundRemovedFile] = useState(null);

  const onImageSelected = (selectedImg, fileDetails) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
    setImageDetails(fileDetails);
  };

  const onCropDone = async (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.crossOrigin = "anonymous"; // Ensure cross-origin is set
    imageObj1.onload = async function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/png"); // Change to PNG format

      setImgAfterCrop(dataURL);
      setCropDetails(imgCroppedArea);

      let loadingToast;
      try {
        loadingToast = toast.loading("Removing background...", {
          position: "top-right",
          style: {
            marginTop: "62px",
          },
        });

        const response = await fetch(dataURL);
        const blob = await response.blob();

        // Resize image before removing the background
        const resizedBlob = await resizeImageBlob(blob, 800, 800); // Example resize to 800x800 max

        const resultBlob = await removeBackground(resizedBlob);
        const resultURL = URL.createObjectURL(resultBlob);

        setImgAfterBackgroundRemoval(resultURL);

        // Create a file object from the result blob
        const backgroundRemovedFile = new File(
          [resultBlob],
          "background-removed-image.png", // Ensure PNG format
          {
            type: "image/png",
          }
        );
        setBackgroundRemovedFile(backgroundRemovedFile);

        // Automatically trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = resultURL;
        downloadLink.download = "background-removed-image.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        toast.success("Background removed successfully!", {
          position: "top-right",
          style: {
            marginTop: "62px",
          },
        });

        console.log("Cropped Image with Background Removed:", resultURL);
        console.log(
          "Background Removed Image File Object:",
          backgroundRemovedFile
        );
      } catch (error) {
        console.error("Error removing background:", error);
        toast.error("Something went wrong", {
          position: "top-right",
          style: {
            marginTop: "62px",
          },
        });
      } finally {
        // Close the loading state
        if (loadingToast) {
          toast.dismiss(loadingToast);
        }
      }

      setCurrentPage("img-cropped");
    };
  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
    setImageDetails(null);
    setImgAfterCrop("");
    setImgAfterBackgroundRemoval("");
    setBackgroundRemovedFile(null); // Reset the file object
  };

  const resizeImageBlob = (blob, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(blob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((newBlob) => {
          resolve(newBlob);
        }, "image/png");
      };
    });
  };

  return (
    <div className="red">
      <Navbar />
      <div className="container">
        {currentPage === "choose-img" ? (
          <Fileinput onImageSelected={onImageSelected} />
        ) : currentPage === "crop-img" ? (
          <ImageCropper
            image={image}
            onCropDone={onCropDone}
            onCropCancel={onCropCancel}
          />
        ) : (
          <div>
            {imgAfterBackgroundRemoval ? (
              <div>
                <img
                  src={imgAfterBackgroundRemoval}
                  className="cropped-img"
                  alt="Cropped Image with Background Removed"
                />
              </div>
            ) : (
              <div>Loading...</div>
            )}

            <button
              onClick={() => {
                setCurrentPage("crop-img");
              }}
              className="btn"
            >
              Crop
            </button>
            <button
              onClick={() => {
                setCurrentPage("choose-img");
                setImage("");
                setImageDetails(null);
                setImgAfterCrop("");
                setImgAfterBackgroundRemoval("");
                setBackgroundRemovedFile(null); // Reset the file object
              }}
              className="btn"
            >
              New Image
            </button>
          </div>
        )}
        <Toaster containerStyle={{ marginTop: "5rem" }} />
      </div>
    </div>
  );
};

export default App;
