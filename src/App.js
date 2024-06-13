import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import OnlyCrop from "./pages/OnlyCrop";
import CropWithBackgroundRemove from "./pages/CropWithBackgroundRemove";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={OnlyCrop} />

        <Route path="/crop5to3" Component={OnlyCrop}/>
        <Route path="/crop1to1" Component={OnlyCrop}/>


        <Route path="/crop_background" Component={CropWithBackgroundRemove} />

        <Route path="/crop_background1to1" Component={CropWithBackgroundRemove} />
        <Route path="/crop_background3to1" Component={CropWithBackgroundRemove} />
      </Routes>
    </>
  );
};

export default App;
