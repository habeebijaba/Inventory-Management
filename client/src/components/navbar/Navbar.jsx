import React, { useContext, useEffect, useState, useRef } from "react";
import "./navbar.scss";
import { AuthContext } from "../../context/authContext";
import Notification from "../notification/Notification";
import axios from "axios";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [count, setCount] = useState(0);

  const getNotification = async () => {
    try {
      const res = await axios.get("/api/requests");
      setCount(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    getNotification();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="logo" />
        <span>Inventory</span>
      </div>
      <div className="icons">
        <img src="search.svg" alt="" className="icon" />
        {/* <img src="app.svg" alt="" className="icon" /> */}
        {/* <img src="expand.svg" alt="" className="icon" /> */}
        <div onClick={() => setOpenNotification(true)} className="notification">
          <img src="notifications.svg" alt="" />
          {count > 0 ? <span>{count}</span> : ""}
        </div>
        <div className="user">
          <span>{currentUser?.username}</span>

          <div className="user-dropdown" ref={dropdownRef}>
            <div className="user-avatar" onClick={toggleDropdown}>
              <img src="/avatar1.png" alt="User Avatar" />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* <img
            src="https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg"
            alt=""
          /> */}
        </div>
        {/* <img src="settings.svg" alt="" className="icon" /> */}
      </div>
      {openNotification && (
        <Notification setOpenNotification={setOpenNotification} />
      )}
    </div>
  );
};

export default Navbar;
