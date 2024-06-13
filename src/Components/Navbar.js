import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg "
        style={{ backgroundColor: "#240750", height: "5rem" }}
      >
        <div class="container-fluid ">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active custom-color"
                  aria-current="page"
                  href="#"
                  style={{ color: "white" }}
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "white" }}>
                  Link
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "white" }}
                >
                  Design
                </a>
                <ul
                  class="dropdown-menu"
                  style={{ backgroundColor: "#240750" }}
                >
                  <li>
                    <Link
                      class="dropdown-item"
                     to={'/crop5to3'}
                      style={{ color: "white" }}
                    >
                      Crop for Course Contents
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                     to={'/crop1to1'}
                      style={{ color: "white" }}
                    >
                      Crop for Logo
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                     to={'/crop_background1to1'}
                      style={{ color: "white" }}
                    >
                      Crop for Profile Picture
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                     to={'/crop_background3to1'}
                      style={{ color: "white" }}
                    >
                      Crop for Signature
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                     to={'/crop_background'}
                      style={{ color: "white" }}
                    >
                      Crop & Remove Any
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
